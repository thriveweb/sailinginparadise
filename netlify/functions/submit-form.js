/**
 * Verifies a Cloudflare Turnstile token, then forwards the submission to
 * Netlify Forms using a SECRET form-name that is only registered via the
 * hidden /__forms.html file. Bots that scrape the rendered React forms see
 * the visible form names ("Enquiry Form" / "Booking Enquiry") which are
 * NOT registered with Netlify Forms, so direct POSTs to the site root
 * with those names are silently dropped.
 *
 * Required Netlify env var:
 *   TURNSTILE_SECRET_KEY
 *
 * Form must POST application/x-www-form-urlencoded with at minimum:
 *   form-name              -> the visible form name (mapped below)
 *   cf-turnstile-response  -> token from the Turnstile widget
 */

const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

// Visible (public) form name → registered (secret) form name.
const FORM_NAME_MAP = {
  'Enquiry Form': 'sip-enquiry-verified',
  'Booking Enquiry': 'sip-booking-verified'
}

const ALLOWED_HOSTS = [
  'sailinginparadise.com.au',
  'www.sailinginparadise.com.au'
]

function isAllowedOrigin(headers) {
  const origin = headers.origin || headers.Origin || ''
  const referer = headers.referer || headers.Referer || ''
  const candidate = origin || referer
  if (!candidate) return false
  try {
    const url = new URL(candidate)
    return ALLOWED_HOSTS.includes(url.hostname)
  } catch {
    return false
  }
}

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('Missing TURNSTILE_SECRET_KEY env var')
    return { statusCode: 500, body: 'Server misconfigured' }
  }

  if (!isAllowedOrigin(event.headers)) {
    console.warn('Rejected: bad origin', {
      origin: event.headers.origin,
      referer: event.headers.referer
    })
    return { statusCode: 403, body: 'Bad origin' }
  }

  const params = new URLSearchParams(event.body || '')
  const token = params.get('cf-turnstile-response')
  const visibleFormName = params.get('form-name')

  if (!visibleFormName) {
    return { statusCode: 400, body: 'Missing form-name' }
  }
  if (!token) {
    return { statusCode: 400, body: 'Missing Turnstile token' }
  }

  const targetFormName = FORM_NAME_MAP[visibleFormName]
  if (!targetFormName) {
    console.warn('Rejected: unknown form-name', { visibleFormName })
    return { statusCode: 400, body: 'Unknown form-name' }
  }

  const remoteip =
    event.headers['x-nf-client-connection-ip'] ||
    (event.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    undefined

  const verifyBody = new URLSearchParams()
  verifyBody.set('secret', secret)
  verifyBody.set('response', token)
  if (remoteip) verifyBody.set('remoteip', remoteip)

  let verifyJson
  try {
    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verifyBody.toString()
    })
    verifyJson = await verifyRes.json()
  } catch (err) {
    console.error('Turnstile verify request failed', err)
    return { statusCode: 502, body: 'Verification service unavailable' }
  }

  if (!verifyJson || !verifyJson.success) {
    console.warn('Turnstile verification failed', verifyJson)
    return { statusCode: 403, body: 'Verification failed' }
  }

  // Replace the visible form name with the registered secret form name,
  // drop the bulky Turnstile token, and add a marker + the original
  // client IP so the submission notification clearly shows it was
  // verified through the function (any submission missing "verified"
  // field reached Netlify Forms directly and is spam).
  params.set('form-name', targetFormName)
  params.delete('cf-turnstile-response')
  params.set('verified', 'turnstile')
  if (remoteip) params.set('client-ip', remoteip)

  const host = event.headers['x-forwarded-host'] || event.headers.host
  const proto = event.headers['x-forwarded-proto'] || 'https'
  const siteUrl = `${proto}://${host}/`

  try {
    const submitRes = await fetch(siteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'sip-turnstile-proxy'
      },
      body: params.toString()
    })

    if (!submitRes.ok && submitRes.status !== 200) {
      console.error(
        'Netlify Forms submission failed',
        submitRes.status,
        await submitRes.text()
      )
      return { statusCode: 502, body: 'Submission failed' }
    }
  } catch (err) {
    console.error('Failed to forward submission', err)
    return { statusCode: 502, body: 'Submission failed' }
  }

  console.log('Submission accepted', { visibleFormName, targetFormName })

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true })
  }
}

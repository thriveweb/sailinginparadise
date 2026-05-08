/**
 * Verifies a Cloudflare Turnstile token, then forwards the submission
 * to Netlify Forms. Spam bots that POST directly to Netlify Forms cannot
 * use this endpoint without a valid token.
 *
 * Required Netlify env var:
 *   TURNSTILE_SECRET_KEY
 *
 * Form must POST application/x-www-form-urlencoded with at minimum:
 *   form-name              -> the registered Netlify form name
 *   cf-turnstile-response  -> token from the Turnstile widget
 */

const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('Missing TURNSTILE_SECRET_KEY env var')
    return { statusCode: 500, body: 'Server misconfigured' }
  }

  const params = new URLSearchParams(event.body || '')
  const token = params.get('cf-turnstile-response')
  const formName = params.get('form-name')

  if (!formName) {
    return { statusCode: 400, body: 'Missing form-name' }
  }
  if (!token) {
    return { statusCode: 400, body: 'Missing Turnstile token' }
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
    return {
      statusCode: 403,
      body: 'Verification failed'
    }
  }

  // Strip the Turnstile token before forwarding so it doesn't show up in
  // form submission notifications.
  params.delete('cf-turnstile-response')

  // Forward to Netlify Forms. Posting back to the site root with the
  // form-name field is how Netlify ingests submissions.
  const host = event.headers['x-forwarded-host'] || event.headers.host
  const proto = event.headers['x-forwarded-proto'] || 'https'
  const siteUrl = `${proto}://${host}/`

  try {
    const submitRes = await fetch(siteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Avoid recursive routing through any redirects
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

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true })
  }
}

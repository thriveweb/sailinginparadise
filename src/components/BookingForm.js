import React, { Fragment } from 'react'
import { stringify, parse } from 'qs'
import { serialize } from 'dom-form-serializer'
import Select from './Select'
import { ICONButtonArrows } from './Icons'
import NumericInput from 'react-numeric-input'
import _get from 'lodash/get'
import _startCase from 'lodash/startCase'
import _format from 'date-fns/format'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import './BookingForm.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Booking Enquiry',
    action: '',
    honeypot: 'confirm',
    successMessage:
      'Thank you for enquiring about cruise with sailing in paradise, we will be in touch very soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  constructor(props) {
    super(props)
    this.state = {
      startDate: '',
      alert: '',
      disabled: true,
      labelDisplay: false,
      yourName: '',
      emailAddress: '',
      phone: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.turnstileRef = React.createRef()
    this.turnstileWidgetId = null
  }

  componentDidMount() {
    this.renderTurnstile()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.alert && this.state.alert) {
      this.removeTurnstile()
    } else if (prevState.alert && !this.state.alert) {
      this.renderTurnstile()
    }
  }

  componentWillUnmount() {
    this.removeTurnstile()
  }

  renderTurnstile = () => {
    if (typeof window === 'undefined') return
    if (!this.turnstileRef.current) return
    if (this.turnstileWidgetId) return
    if (!window.turnstile || !window.turnstile.render) {
      this.turnstileRetry = setTimeout(this.renderTurnstile, 250)
      return
    }
    this.turnstileWidgetId = window.turnstile.render(
      this.turnstileRef.current,
      { sitekey: '0x4AAAAAADKcUNLZ2mlUHBT1' }
    )
  }

  removeTurnstile = () => {
    if (this.turnstileRetry) clearTimeout(this.turnstileRetry)
    if (
      this.turnstileWidgetId &&
      typeof window !== 'undefined' &&
      window.turnstile &&
      window.turnstile.remove
    ) {
      try {
        window.turnstile.remove(this.turnstileWidgetId)
      } catch (e) {
        /* noop */
      }
    }
    this.turnstileWidgetId = null
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    this.setState({ disabled: true })

    const data = serialize(form)

    fetch('/.netlify/functions/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.removeTurnstile()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        if (typeof window !== 'undefined' && window.turnstile) {
          try {
            window.turnstile.reset(this.turnstileWidgetId)
          } catch (resetErr) {
            /* noop */
          }
        }
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  handleValueChange = e => {
    if (this.state.yourName.length <= 2) {
      this.setState({ disabled: true })
    } else {
      this.setState({ disabled: false })
    }
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  handleClick() {
    this.setState({
      labelDisplay: true
    })
  }

  render() {
    const { name, action, honeypot } = this.props
    const { startDate } = this.state

    const location = _get(this.props, 'location') || {}
    const search = _get(location, 'search') || ''

    const query = search ? parse(search.replace('?', '')) : ''
    const formCharter = query.charter

    const formatting = (
      <time itemProp="dateCreated pubdate datePublished" date={startDate}>
        {_format(startDate, 'dd MMM yyyy')}
      </time>
    )
    const date = _get(formatting, 'props.children') || ''
    const charterType = _get(this, 'state.charterType')
    const yourName = _get(this, 'state.yourName')

    return (
      <form
        className="Form BookingForm"
        name={name}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=""
        data-netlify-honeypot={honeypot}
      >
        {this.state.alert && (
          <div className="Form--Alert">{this.state.alert}</div>
        )}

        {!this.state.alert && (
          <Fragment>
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="text"
                placeholder="Name*"
                name="yourName"
                onChange={this.handleValueChange}
                required
              />
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="email"
                placeholder="Email*"
                name="emailAddress"
                onChange={this.handleValueChange}
                required
              />
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="text"
                placeholder="Company Name"
                name="companyName"
                onChange={this.handleValueChange}
              />
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="text"
                placeholder="Phone*"
                name="phone"
                onChange={this.handleValueChange}
                required
              />
            </label>
            <label className="Form--Label full-width">
              <span>Approx. number of guests*</span>
              <NumericInput className="form-control" min={0} mobile required />
            </label>
            <Select
              placeholder="Charter Type*"
              name="charterType"
              selected={formCharter}
              handleValueChange={this.handleValueChange}
              options={[
                'Raft Ups',
                'Hens Parties',
                'Birthday Parties',
                'Corporate Events',
                'Christmas Parties',
                'Memorial Ashes Scattering',
                'Wedding Proposals',
                'Romantic Couples Only',
                'Family with Kids',
                'Holiday',
                'Private Charters',
                'Bucks Parties'
              ]}
            />
            <div className="Form--Label date-section">
              <DatePicker
                name="date"
                required
                className="Form--Input"
                selected={this.state.startDate}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <p
                className={`date-label ${this.state.startDate ? 'active' : ''}`}
              >
                Preferred Date*
                <span>
                  (if unsure please select any date within Preffered month)
                </span>
              </p>
            </div>
            <Select
              placeholder="How did you hear about us?*"
              name="source"
              options={[
                'Web Search',
                'Facebook',
                'Instagram',
                'Friend or family referral',
                'Signage',
                'Flyer',
                'Sailed with us before',
                'Other'
              ]}
            />
            <input
              type="hidden"
              name={honeypot}
              className="Form--Input-honey"
              placeholder="Leave blank if you are a human"
            />
            <input
              type="hidden"
              name="subject"
              value={`${yourName} | ${_startCase(charterType)} - ${date}`}
            />
            <input type="hidden" name="form-name" value={name} />
            <div ref={this.turnstileRef} className="Form--Turnstile" />
            <div className="form-footer">
              <div>
                <input
                  className="button Form--SubmitButton"
                  type="submit"
                  value="Send"
                  disabled={this.state.disabled}
                />
                <ICONButtonArrows />
              </div>
            </div>
          </Fragment>
        )}
      </form>
    )
  }
}

export default Form

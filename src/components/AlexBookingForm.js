import React, { Fragment } from 'react'
import { stringify, parse } from 'qs'
import { serialize } from 'dom-form-serializer'
import _get from 'lodash/get'

import { ICONButtonArrows } from './Icons'

import DatePicker from 'react-datepicker'
import Select from './Select'
import 'react-datepicker/dist/react-datepicker.css'

import './AlexBookingForm.css'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class AlexBookingForm extends React.Component {
  static defaultProps = {
    name: 'New Booking Form',
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
      startDate: new Date(),
      alert: '',
      disabled: false,
      clickDate: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  handleClick = event => {
    event.preventDefault()
    this.setState({
      clickDate: true
    })
    event.target.classList.toggle('active')
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return
    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
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
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, action, honeypot, location } = this.props

    // get ref
    const search = _get(location, 'search') || ''
    const query = search ? parse(search.replace('?', '')) : ''
    const formCharter = query.charter

    return (
      <form
        className="Form AlexBookingForm"
        name={name}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify="true"
        method="post"
        data-netlify-honeypot={honeypot}
      >
        <input
          type="hidden"
          name={honeypot}
          className="Form--Input-honey"
          placeholder="Leave blank if you are a human"
        />
        <input
          type="hidden"
          name="subject"
          value={`Booking for ${this.state.startDate}`}
        />
        <input type="hidden" name="form-name" value={name} />
        {this.state.alert && (
          <div className="Form--Alert">{this.state.alert}</div>
        )}
        {!this.state.alert && (
          <Fragment>
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="text"
                placeholder="First Name*"
                name="firstName"
                required
              />
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="text"
                placeholder="Last Name*"
                name="lastName"
                required
              />
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="text"
                placeholder="Company Name"
                name="compnayName"
              />
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="text"
                placeholder="Phone*"
                name="phone"
                required
              />
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="email"
                placeholder="Email*"
                name="emailAddress"
                required
              />
            </label>
            <label className="Form--Label ">
              <input
                className="Form--Input"
                type="number"
                placeholder="Approx. number of guests*"
                name="numberOfGusets"
                required
              />
            </label>

            <label className="Form--Label TextArea" onClick={this.handleClick}>
              <div className="dateMessage">
                <div className="dateMessageText">
                  Preferred Date*{' '}
                  <span>
                    (if unsure please select any date within Preffered month)
                  </span>
                </div>
              </div>
              <DatePicker
                className="Form--Input DatePicker"
                dateFormat="dd/MM/yyyy"
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </label>

            <Select
              className="TextArea"
              placeholder="Charter Type*"
              selected={formCharter}
              name="charterType"
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

            <Select
              className="TextArea"
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
            <label className="Form--Label TextArea">
              <textarea
                className="Form--Input Form--Textarea"
                placeholder="Let us know anything else we can help with."
                name="message"
                rows="3"
              />
            </label>
            <div className="form-footer">
              <input
                className="button Form--SubmitButton"
                type="submit"
                value="Send"
                disabled={this.state.disabled}
              />
              <ICONButtonArrows />
            </div>
          </Fragment>
        )}
      </form>
    )
  }
}
export default AlexBookingForm

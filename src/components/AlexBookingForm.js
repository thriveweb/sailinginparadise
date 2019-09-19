import React, { Fragment } from 'react'
import { stringify, parse } from 'qs'
import { serialize } from 'dom-form-serializer'
import _get from 'lodash/get'
import _startCase from 'lodash/startCase'
import _format from 'date-fns/format'

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
      startDate: null,
      alert: '',
      disabled: false,
      clickDate: false,
      charterType: '',
      firstName: '',
      lastName: ''
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

  handleValueChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
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
    // full name subject
    const fullName = this.state.firstName + ' ' + this.state.lastName

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
          value={`Boat Charter  - ${_startCase(
            this.state.charterType
          )} | ${fullName}, ${_format(this.state.startDate, 'DD MMM YYYY')}`}
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
                onChange={this.handleValueChange}
                required
              />
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="text"
                placeholder="Last Name*"
                name="lastName"
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

            <label className="Form--Label TextArea PreferredDate">
              <DatePicker
                placeholderText="Preferred Date*"
                className="Form--Input DatePicker"
                dateFormat="dd/MM/yyyy"
                selected={this.state.startDate}
                onChange={this.handleChange}
                name="preferredDate"
              />
              <span className="PreferredDate-message">
                (if unsure please select any date within preferred month)
              </span>
            </label>

            <Select
              className="TextArea"
              placeholder="Charter Type*"
              selected={formCharter}
              handleValueChange={this.handleValueChange}
              name="charterType"
              options={[
                'Birthday Parties',
                'Hens Parties',
                'Corporate Events',
                'Raft Up Events',
                'Christmas Parties',
                'Sightseeing',
                'Proposals',
                'Romantic Sails',
                'Family Charters',
                'Memorial Charters',
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

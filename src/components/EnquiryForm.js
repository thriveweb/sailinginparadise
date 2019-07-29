import React, { Fragment } from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import { ICONButtonArrows } from './Icons'

import './EnquiryForm.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Enquiry Form',
    subject: '', // optional subject of the notification email
    action: '',
    honeypot: 'confirm',
    successMessage: 'Thanks for your enquiry, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false
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
    const { name, subject, action, honeypot } = this.props

    return (
      <form
        className="EnquiryForm"
        name={name}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify="true"
        method="post"
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
                placeholder="Name"
                name="name"
                required
              />
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="email"
                placeholder="Email"
                name="emailAddress"
                required
              />
            </label>
            <label className="Form--Label TextArea">
              <input
                className="Form--Input"
                type="text"
                placeholder="Phone"
                name="phone"
                required
              />
            </label>
            <label className="Form--Label TextArea">
              <textarea
                className="Form--Input Form--Textarea"
                placeholder="Let us know the number guests, dates, and what you want to do."
                name="message"
                rows="3"
                required
              />
            </label>
            <input
              type="hidden"
              name={honeypot}
              className="Form--Input-honey"
              placeholder="Leave blank if you are a human"
            />
            {!!subject && (
              <input type="hidden" name="subject" value={subject} />
            )}
            <input type="hidden" name="form-name" value={name} />
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

export default Form

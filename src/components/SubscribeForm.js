import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import { ICONButtonArrows } from './Icons'
import './SubscribeForm.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Subscribe Form',
    subject: '', // optional subject of the notification email
    action: '',
    honeypot: 'confirm',
    successMessage: 'Thanks for your submission',
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
      <section className='SubscribeBanner'>
        <div className='container'>
          <div className='form-description'>
            <h4>be the first to receive exclusive offers</h4>
            <h3>Subscribe to our Newsletter</h3>
          </div>
          <form
            className="Form"
            name={name}
            action={action}
            onSubmit={this.handleSubmit}
            data-netlify=""
            data-netlify-honeypot={honeypot}
          >
            {this.state.alert && (
              <div className="Form--Alert">{this.state.alert}</div>
            )}
            <label className="Form--Label">
              <input
                className="Form--Input"
                type="email"
                placeholder="Your email"
                name="emailAddress"
                required
              />
            </label>
            <input
              type="hidden"
              name={honeypot}
              className="Form--Input-honey"
              placeholder="Leave blank if you are a human"
            />
            {!!subject && <input type="hidden" name="subject" value={subject} />}
            <input type="hidden" name="form-name" value={name} />
            <div className='form-footer'>
              <input
                className="button Form--SubmitButton"
                type="submit"
                value="Subscribe"
                disabled={this.state.disabled}
              />
              <ICONButtonArrows />
            </div>  
          </form>
        </div> 
      </section>   
    )
  }
}

export default Form

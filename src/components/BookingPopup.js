import React, { Component } from 'react'
import { Location } from '@reach/router'

import Image from './Image'
import Button from './Button'
import { ICONButtonArrows } from './Icons'
import { X } from 'react-feather'

import './BookingPopup.css'
import { Helmet } from 'react-helmet'

class Popup extends Component {
  render() {
    return (
      <Location>
        {({ location }) => {
          const { title, contentBoxes, classActive } = this.props

          return (
            <section className={`booking-popup ${classActive}`}>
              <Helmet>
                <script type="text/javascript" src="https://sailinginparadise.rezdy.com/pluginJs?script=modal" async={false}></script>
              </Helmet>
              <div
                className="booking-popup-Background"
                onClick={this.props.handlePopup}
              />
              <div className="popup-close" onClick={this.props.handlePopup}>
                <X />
              </div>

              <div className="container skinny">
                {title && <h2>{title}</h2>}
                <div className="contentBoxes">
                  {contentBoxes &&
                    contentBoxes.map(
                      ({ icon, title, buttonTitle, buttonUrl }, index) => {
                        const isIframe = buttonUrl && buttonUrl.startsWith('http')
                        const iframeContent = isIframe ? `                        
                        <a id="button-booking" class="button button-booking rezdy rezdy-modal" href="${buttonUrl}?iframe=true">${buttonTitle}</a>
                        `: ``;
                        // console.log("****** iframe", isIframe, iframeContent)
                        return (
                          <div className="contentBox" key={index}>
                            {icon && <Image src={icon} alt="" />}
                            {title && <h3>{title}</h3>}
                            {location &&
                              location.pathname === `/${buttonUrl}` ? (
                              <p
                                className="button"
                                onClick={this.props.handlePopup}
                              >
                                {buttonTitle}
                                <ICONButtonArrows />
                              </p>
                            ) : (
                              <div onClick={this.props.handlePopup}>
                                {isIframe &&
                                  <div dangerouslySetInnerHTML={{ __html: iframeContent }} />
                                }
                                {!isIframe &&
                                  <Button title={buttonTitle} url={buttonUrl + "/"} />
                                }
                              </div>
                            )}
                          </div>
                        )
                      }
                    )}
                </div>
              </div>
            </section>
          )
        }}
      </Location>
    )
  }
}

export default Popup

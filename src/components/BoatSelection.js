import React from 'react'
import { Link } from 'gatsby'
import './BoatSelection.css'
import Button from './Button'

const BoatSelection = ({ boats }) => {
  console.log("***** boats *****", boats)
  return (
    <section className="boat-selection">
      <div className="boat-selection-grid">
        {boats && boats.map((boat, index) => (
          <div className="boat-card" key={index}>
            <a href={`/boats/${boat.title.toLowerCase().replace(/\s+/g, '-')}`} className="boat-link">
              <div className="boat-image-container">
                <img src={boat.featuredImage} alt={boat.title} className="boat-image" />
                <h3 className="boat-title">{boat.title}</h3>
              </div>
              <div className="boat-features">
                {boat.boatListingFeatures && boat.boatListingFeatures.map((feature, i) => (
                  <div className="feature-item" key={i}>
                    <span className="feature-dot">•</span>
                    <span className="feature-text">{feature.content}</span>
                  </div>
                ))}
                <div className="more-info-container">
                  <Button title="More Info" url={`/boats/${boat.title.toLowerCase().replace(/\s+/g, '-')}`} className="more-info" />
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BoatSelection 
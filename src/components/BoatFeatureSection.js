import React from 'react';
import './BoatFeatureSection.css';
import Content from './Content';
import FeatureTickIcon from './FeatureTickIcon';

const BoatFeatureSection = ({ boatFeaturesIntro, boatFeatures }) => {
    return (
        <div className="container boat-features-list">
            <h4>BOAT FEATURES</h4>
            {boatFeaturesIntro && <Content src={boatFeaturesIntro} />}
            <div className="features-columns">
                <div className="feature-column">
                    {boatFeatures && boatFeatures.map((feature, i) => {
                        if (i % 2 === 0) {
                            return (
                                <div className="feature-item-row" key={`features-${i}`}>
                                    <div className="feature-item">
                                        <span className="feature-dot"><FeatureTickIcon size={10} /></span>
                                        <span className="feature-text">{feature.content}</span>
                                    </div>
                                    <div className="feature-divider" />
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="feature-column">
                    {boatFeatures && boatFeatures.map((feature, i) => {
                        if (i % 2 !== 0) {
                            return (
                                <div className="feature-item-row" key={`features-${i}`}>
                                    <div className="feature-item">
                                        <span className="feature-dot"><FeatureTickIcon size={10} /></span>
                                        <span className="feature-text">{feature.content}</span>
                                    </div>
                                    <div className="feature-divider" />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div className="features-button-row">
                <button className="nav-button">ENQUIRE NOW</button>
            </div>
        </div>
    );
}

export default BoatFeatureSection;
import React from 'react'

import { ICONFacebook, ICONTwitter } from './Icons'
import './SocialShare.css'

export default () => (
  <ul className="share-buttons">
    <p>SHARE ON</p>
    <li>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${
          typeof document !== 'undefined' ? document.location.href : ''
        }`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Facebook"
      >
        <ICONFacebook />
      </a>
    </li>
    <li>
      <a
        href={`https://twitter.com/intent/tweet?source=${
          typeof document !== 'undefined' ? document.location.href : ''
        }&text=Sailing In Paradise - ${
          typeof document !== 'undefined' ? document.location.href : ''
        }`}
        target="_blank"
        rel="noopener noreferrer"
        title="Tweet"
      >
        <ICONTwitter />
      </a>
    </li>
  </ul>
)

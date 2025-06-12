import React from 'react'

import './Image.css'

class Image extends React.Component {
  render() {
    let {
      background,
      backgroundSize = 'cover',
      className = '',
      src,
      source,
      onClick,
      sizes,
      alt
    } = this.props

    function convertUploadcareUrlToLocal(url) {
      // Find index of '-/' in the URL
      const index = url.indexOf('-/');
      
      // If found, return substring up to that point; else, return original URL
      return index !== -1 ? url.substring(0, index) : url;
    }

    let imageSrc = src || source

    // console.log("**** Image source:", imageSrc);
    imageSrc = convertUploadcareUrlToLocal(imageSrc);
    // console.log("**** After Image source:", imageSrc);

    if (background) {
      let style = {}

      if (typeof imageSrc === 'string') {
        style = { backgroundImage: `url(${imageSrc})`, backgroundSize }
      }

      return (
        <div className={`BackgroundImage absolute ${className}`} style={style}>
          {!style.backgroundImage && (
            <Image
              src={imageSrc}
              alt={alt}
              style={{
                position: 'absolute',
                width: 'auto',
                height: 'auto'
              }}
              imgStyle={{
                objectFit: backgroundSize
              }}
            />
          )}
        </div>
      )
    }

    return (
      <img
        className={`Image ${className}`}
        src={imageSrc}
        sizes={sizes || '100vw'}
        onClick={onClick}
        alt={alt}
      />
    )
  }
}

export default Image
import React from 'react'

export default ({
  className = '',
  color = 'rgba(65,63,71,0.7)',
  opacity = 0.2,
  ...props
}) => (
  <div
    className={`Overlay ${className}`}
    style={{
      color,
      opacity,
      backgroundColor: 'currentColor',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }}
    {...props}
  />
)

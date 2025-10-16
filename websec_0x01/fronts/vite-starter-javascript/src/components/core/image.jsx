import * as React from 'react';

/**
 * This component has been implemented to keep the consistency between Next.js and Vite version. It does not have any
 * of the features of the Next.js Image component, such as lazy loading, priority loading, and so on.
 */
export function Image({ src, alt, fill, height, style, width }) {
  let finalStyle = { ...style };

  if (fill) {
    finalStyle = {
      height: '100%',
      left: 0,
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      width: '100%',
      ...finalStyle,
    };
  }

  return <img alt={alt} height={height} src={src} style={finalStyle} width={width} />;
}

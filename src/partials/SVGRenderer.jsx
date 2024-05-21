import React from 'react';

const SVGRenderer = ({ svgText }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: svgText }} />
  );
};

export default SVGRenderer;

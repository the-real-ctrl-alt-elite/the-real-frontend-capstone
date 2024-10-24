import React, { useState } from 'react';

const ImageMagnifier = ({
  src,
  width = '100%',
  height = '100%',
  zoomLevel = 2.5,
  enlarge
}) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);


  const magnifierHeight = enlarge ? 3000 : 400;
  const magnifierWidth = enlarge ? 3000 : 400;

  const handleMouseEnter = (e) => {
    if (!enlarge) {
      const elem = e.currentTarget;
      const { width, height } = elem.getBoundingClientRect();
      setSize([width, height]);
      setShowMagnifier(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!enlarge) {
      const elem = e.currentTarget;
      const { top, left } = elem.getBoundingClientRect();
      const x = e.pageX - left - window.pageXOffset;
      const y = e.pageY - top - window.pageYOffset;
      setXY([x, y]);
    }
  };

  const handleMouseLeave = () => {
    if (!enlarge) {
      setShowMagnifier(false);
    }
  };

  const handleImageClick = (e) => {
    if (enlarge) {
      if (showMagnifier) {
        setShowMagnifier(false);
      } else {
        const elem = e.currentTarget;
        const { width, height } = elem.getBoundingClientRect();
        setSize([width, height]);

        const { top, left } = elem.getBoundingClientRect();
        const x = e.pageX - left - window.pageXOffset;
        const y = e.pageY - top - window.pageYOffset;
        setXY([x, y]);

        setShowMagnifier(true);
      }
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        height,
        width,
        overflow: 'hidden',
        objectFit: 'cover',
        cursor: enlarge ? 'crosshair' : showMagnifier ? 'zoom-in' : 'default',
      }}
      className='carousel-item-img'
      onClick={enlarge ? handleImageClick : null}
      onMouseEnter={enlarge ? null : handleMouseEnter}
      onMouseMove={enlarge ? null : handleMouseMove}
      onMouseLeave={enlarge ? null : handleMouseLeave}
    >
      <img
        src={src}
        style={{
          height,
          width,
          overflow: 'hidden',
          objectFit: 'cover',
        }}
        alt='img'
      />

      {showMagnifier && (
        <div
          style={{
            display: '',
            position: 'absolute',
            pointerEvents: 'none',
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: '1',
            border: '1px solid lightgray',
            backgroundColor: 'white',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;

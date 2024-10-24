import React, { useState } from 'react';
import './ImageMagnifier.css';

const ImageMagnifier = ({ src }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMaginifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const handleOnMouseEnter = () => setShowMaginifier(true);
  const handleOnMouseLeave = () => setShowMaginifier(false);
  const handleMouseMove = (e) => {
    const {
      left, top, width, height,
    } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };
  return (
    <div className='img-magnifier-container' onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} onMouseMove={handleMouseMove}>
      <img className='magnifier-img' src={src} alt='image' />
      {showMagnifier && (
      <div
        style={{
          position: 'absolute',
          left: `${cursorPosition.x - 100}px`,
          top: `${cursorPosition.y - 100}px`,
          pointerEvents: 'none',
        }}
      >
        <div
          className='magnifier-image'
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
          }}
        />
      </div>
      )}

    </div>
  );
};

export default ImageMagnifier;

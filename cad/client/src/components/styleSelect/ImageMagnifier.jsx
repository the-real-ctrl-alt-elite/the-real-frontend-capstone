import React, { useState } from 'react';

const ImageMagnifier = ({
  src,
  width = 'auto',
  height = '100%',
  magnifierHeight = 100,
  magnifierWidth = 100,
  zoomLevel = 1.5,
}) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  return (
    <div
      style={{
        position: 'relative',
        height,
        width,
      }}
    >
      <img
        src={src}
        style={{ height, width }}
        onMouseEnter={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          // update cursor position
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();

          // calculate cursor position on the image
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          // close magnifier
          setShowMagnifier(false);
        }}
        alt='img'
      />

      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',

          // prevent magnifier blocks the mousemove event of img
          pointerEvents: 'none',
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: '1', // reduce opacity so you can verify position
          border: '1px solid lightgray',
          backgroundColor: 'white',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',
          borderRadius: '100%',

          // calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          // calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      />
    </div>
  );
};

export default ImageMagnifier;

// const ImageMagnifier = ({ src }) => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [showMagnifier, setShowMaginifier] = useState(false);
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const handleOnMouseEnter = () => setShowMaginifier(true);
//   const handleOnMouseLeave = () => setShowMaginifier(false);
//   const handleMouseMove = (e) => {
//     const {
//       left, top, width, height,
//     } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.pageX - left) / width) * 100;
//     const y = ((e.pageY - top) / height) * 100;
//     setPosition({ x, y });
//     setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
//   };
//   console.log('showMagnifier: ', showMagnifier);
//   return (
//     <div className='img-magnifier-container' onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} onMouseMove={handleMouseMove}>
//       <img className='magnifier-img' src={src} alt='image' />
//       {showMagnifier && (
//       <div
//         style={{
//           position: 'absolute',
//           left: `${cursorPosition.x - 100}px`,
//           top: `${cursorPosition.y - 100}px`,
//           pointerEvents: 'none',
//         }}
//       >
//         <div
//           className='magnifier-image'
//           style={{
//             backgroundImage: `url(${src})`,
//             backgroundPosition: `${position.x}% ${position.y}%`,
//           }}
//         />
//       </div>
//       )}

//     </div>
//   );
// };

// export default ImageMagnifier;

import React, { useState, useEffect } from 'react';

const Styleoptions = (props) => {
  console.log('stylesOptions:', props)
  const [currentStyle, setCurrentStyle] = useState({});

  const newImage = () => {

  }
  const mouseHover = () => {

  }
  const mouseExit = () => {

  }
  useEffect(() => {

  });

  return (
    <div className='style-options-container'>
      <div className='style-title-container'>
        <span className='style-title'>STYLE: </span>
        <span className='style-name'></span>
      </div>
      <div className='style-thumbnails'>
        {
          props.styles.length > 0 && props.styles.map((image, i) => {
            return <img
              className='style-mini-pic'
              key={image.style_id}
              src={image.photos[0].thumbnail_url}
              onClick={newImage}
              onMouseEnter={mouseHover}
              onMouseLeave={mouseExit}
            />
          })
        }
      </div>
    </div>
  );
};

export default Styleoptions;
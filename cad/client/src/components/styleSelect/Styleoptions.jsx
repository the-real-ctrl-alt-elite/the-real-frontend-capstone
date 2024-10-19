import React, { useState, useEffect } from 'react';

const Styleoptions = (props) => {
  // [imageTracker, setImageTracker] = { original_url: '', style_url: '', style_photo: false }
  // [currentStyle, setCurrentStyle] = {original_price: 0, sale_price: 0, percent_change: ''}
  // if (Object.keys(props.productStyles).length > 0) {
  //   console.log('styles-Options:\n',
  //     '\nimage-tracker:', props.imageTracker,
  //     '\nproductStyles:', props.productStyles)
  // }
  const newImage = () => {

  }
  const mouseHover = (url) => {
    props.setImageTracker(prev => ({
      ...prev,
      style_url: url,
      style_photo: true
    }));
  }
  const mouseExit = () => {
    props.setImageTracker(prev => ({
      ...prev,
      style_url: '',
      style_photo: false
    }));
  }
  useEffect(() => {

  }, [props]);

  return (
    <div className='style-options-container'>
      <div className='style-title-container'>
        <span className='style-title'>STYLE: </span>
        <span className='style-name'></span>
      </div>
      <div className='style-thumbnails'>
        {
          props.productStyles.length > 0 && props.productStyles.map((image, i) => {
            return <img
              className='style-mini-pic'
              key={image.style_id}
              src={image.photos[0].thumbnail_url}
              onClick={newImage}
              onMouseEnter={() => mouseHover(image.photos[0].thumbnail_url)}
              onMouseLeave={mouseExit}
            />
          })
        }
      </div>
    </div>
  );
};

export default Styleoptions;
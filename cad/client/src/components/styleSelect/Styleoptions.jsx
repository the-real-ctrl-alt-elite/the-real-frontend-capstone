import React, { useState, useEffect } from 'react';

const Styleoptions = (props) => {
  if (Object.keys(props.productStyles).length > 0) {
    console.log('styles-Options:\n',
      '\nimage-tracker:', props.imageTracker,
      '\nproductStyles:', props.productStyles[0].name)
  }
  const newImage = () => {

  }
  const mouseHover = (url, salePrice, price, colorPeek) => {
    props.setImageTracker(prev => ({
      ...prev,
      style_url: url,
      style_photo: true
    }));
    if (salePrice !== null) {
      const percentChange = (((+salePrice - +price) / +salePrice) * 100).toFixed(0);
      props.setCurrentStyle(prev => ({
        ...prev,
        original_price: price,
        sale_price: salePrice,
        percent_change: percentChange,
        newColor: colorPeek,
        colorCheck: true
      }));
    } else {
      props.setCurrentStyle(prev => ({
        ...prev,
        original_price: price,
        newColor: colorPeek,
        colorCheck: true
      }));
    }
  }
  const mouseExit = () => {
    props.setImageTracker(prev => ({
      ...prev,
      style_url: '',
      style_photo: false
    }));
    props.setCurrentStyle(prev => ({
      ...prev,
      colorCheck: false,
      newColor: '',
    }))
  }
  useEffect(() => {

  }, [props]);

  return (
    <div className='style-options-container'>
      <div className='style-title-container'>
        <span className='style-title'>STYLE: </span>
        <span className='style-name'>
          {
            (props.productStyles.length > 0) &&
              props.currentStyle.colorCheck ?
              props.currentStyle.newColor
              :
              props.currentStyle.color
          }
        </span>
      </div>
      <div className='style-thumbnails'>
        {
          props.productStyles.length > 0 && props.productStyles.map((image, i) => {
            return <img
              className='style-mini-pic'
              key={image.style_id}
              src={image.photos[0].thumbnail_url}
              onClick={newImage}
              onMouseEnter={
                () => mouseHover(
                  image.photos[0].thumbnail_url,
                  image.sale_price,
                  image.original_price,
                  image.name)
              }
              onMouseLeave={mouseExit}
            />
          })
        }
      </div>
    </div>
  );
};

export default Styleoptions;
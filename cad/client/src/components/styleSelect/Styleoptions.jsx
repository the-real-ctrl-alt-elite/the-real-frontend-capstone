import React, { useState, useEffect } from 'react';

const Styleoptions = (props) => {

  const newImage = (url, salePrice, price, colorPeek, index, id) => {

    props.setImageTracker((prev) => ({
      ...prev,
      original_url: url,
    }));
    if (salePrice !== '') {
      const percentChange = (((+salePrice - +price) / +salePrice) * 100).toFixed(0);
      props.setCurrentStyle((prev) => ({
        ...prev,
        original_price: price,
        sale_price: salePrice,
        percent_change: percentChange,
        newColor: colorPeek,
        color: props.currentStyle.newColor,
        colorCheck: true,
        index,
        id,
      }));
    } else {
      props.setCurrentStyle((prev) => ({
        ...prev,
        original_price: price,
        sale_price: '',
        percent_change: null,
        newColor: colorPeek,
        color: props.currentStyle.newColor,
        colorCheck: true,
        index,
        id,
      }));
    }
  };
  const mouseHover = (url, salePrice, price, colorPeek) => {
    props.setImageTracker((prev) => ({
      ...prev,
      style_url: url,
      style_photo: true,
    }));
    if (salePrice !== null) {
      const percentChange = (((+salePrice - +price) / +salePrice) * 100).toFixed(0);
      props.setShownStyle((prev) => ({
        ...prev,
        original_price: price,
        sale_price: salePrice,
        percent_change: percentChange,
        newColor: colorPeek,
        colorCheck: true,
        hasSale: true,
      }));
    } else {
      props.setShownStyle((prev) => ({
        ...prev,
        original_price: price,
        sale_price: null,
        percent_change: null,
        newColor: colorPeek,
        colorCheck: true,
        hasSale: false,
      }));
    }
    props.setHoverState(true);
  };
  const mouseExit = () => {
    props.setImageTracker((prev) => ({
      ...prev,
      style_url: '',
      style_photo: false,
    }));

    props.setHoverState(false);

    props.setShownStyle(props.currentStyle);
  };

  const handleStyleClick = (image, i) => {
    // TODO: not sure if this still necessary
    newImage(
      image.photos[0].thumbnail_url,
      image.sale_price,
      image.original_price,
      image.name,
      image.index = i,
      image.style_id,
    );
  };

  return (
    <div className='style-options-container'>
      <div className='style-title-container'>
        <span className='style-title'>STYLE: </span>
        <span className='style-name'>
          {
            (props.productStyles.length > 0)
              && props.shownStyle.colorCheck
              ? props.shownStyle.newColor
              : props.shownStyle.color
          }
        </span>
      </div>
      <div className='style-thumbnails'>
        {
          props.productStyles.length > 0 && props.productStyles.map((image, i) => {
            return (
              <div style={{ position: 'relative' }} key={i}>
                {props.currentStyle.index === i
                  && <i className='fa-regular fa-check style-check' />}
                <img
                  alt=''
                  className='style-mini-pic'
                  key={image.style_id}
                  src={image.photos[0].thumbnail_url}
                  onClick={() => handleStyleClick(image, i)}
                  onMouseEnter={
                    () => mouseHover(
                      image.photos[0].thumbnail_url,
                      image.sale_price,
                      image.original_price,
                      image.name,
                    )
                  }
                  onMouseLeave={mouseExit}
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Styleoptions;

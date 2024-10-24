import React, { useState, useEffect } from 'react';
import ImageMagnifier from './ImageMagnifier';

const Gallery = ({
  images, imgIdx, handleImgIdx, handleEnlargeClick,
}) => {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    if (imgIdx === 0) {
      setShowRightButton(true);
      setShowLeftButton(false);
    } else if (imgIdx === images.length - 1) {
      setShowRightButton(false);
      setShowLeftButton(true);
    } else {
      setShowRightButton(true);
      setShowLeftButton(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgIdx]);

  useEffect(() => {
    if (images.length === 1 || images.length === 0) {
      setShowLeftButton(false);
      setShowRightButton(false);
    }
  }, [images]);

  const handleRightClick = () => {
    const nextIdx = imgIdx + 1;
    if (nextIdx === images.length - 1) {
      setShowRightButton(false);
    }
    handleImgIdx(nextIdx);
    setShowLeftButton(true);
  };

  const handleLeftClick = () => {
    const nextIdx = imgIdx - 1;
    if (nextIdx === 0) {
      setShowLeftButton(false);
    }
    handleImgIdx(nextIdx);
    setShowRightButton(true);
  };

  const handleModalToggle = () => {
    handleEnlargeClick(images[imgIdx]);
  };

  return (
    <div className='carousel-container'>
      {showLeftButton
      && (
      <button
        type='button'
        label='left-scroll-btn'
        className='gallery-left-btn'
        onClick={handleLeftClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>
      )}
      { images.map((item) => {
        return (
          <button
            type='button'
            className='carousel-item'
            style={{ transform: `translate(-${imgIdx * 100}%)` }}
            onClick={handleModalToggle}
            key={item}
          >
            {/* <img className='carousel-item-img' src={item} alt='product-image' /> */}
            <ImageMagnifier src={item} />
          </button>
        );
      })}
      {showRightButton
      && (
      <button
        type='button'
        label='right-scroll-btn'
        className='gallery-right-btn'
        onClick={handleRightClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 5l7 7-7 7'
          />
        </svg>
      </button>
      )}
    </div>
  );
};

export default Gallery;

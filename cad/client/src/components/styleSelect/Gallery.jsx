import React, { useState, useEffect } from 'react';

const Gallery = ({ images, imgIdx }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    setCurrentIdx(imgIdx);
    if (imgIdx === 0 && images.length) {
      setShowRightButton(true);
      setShowLeftButton(false);
    } else if (imgIdx === images.length - 1) {
      setShowRightButton(false);
      setShowLeftButton(false);
    } else {
      setShowRightButton(true);
      setShowLeftButton(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgIdx]);

  useEffect(() => {
    if (images.length === 1) {
      setShowLeftButton(false);
      setShowRightButton(false);
    }
  }, [images]);

  const handleRightClick = () => {
    const nextIdx = currentIdx + 1;
    if (nextIdx === images.length - 1) {
      setShowRightButton(false);
    }

    setCurrentIdx(nextIdx);
    setShowLeftButton(true);
  };

  const handleLeftClick = () => {
    const nextIdx = currentIdx - 1;
    if (nextIdx === 0) {
      setShowLeftButton(false);
    }
    setCurrentIdx(nextIdx);
    setShowRightButton(true);
  };

  const handleModalToggle = () => {
    console.log('clicked');
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
            style={{ transform: `translate(-${currentIdx * 100}%)` }}
            key={item}
          >
            <img className='carousel-item-img' src={item} alt='product-image' />
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

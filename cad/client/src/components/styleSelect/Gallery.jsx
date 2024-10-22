import React, { useState } from 'react';

const Gallery = () => {
  const data = ['1', '2', '3', '4', '5'];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleRightClick = () => {
    const nextIdx = currentIdx + 1;
    if (nextIdx === data.length - 1) {
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

  return (
    <div className='carousel-container'>
      {showLeftButton
      && (
      <button
        type='button'
        label='left-scroll-btn'
        className='left-scroll-btn'
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
      { data.map((item, idx) => {
        return <div className='carousel-item' style={{ transform: `translate(-${currentIdx * 100}%)` }} key={idx}>{item}</div>;
      })}
      {showRightButton
      && (
      <button
        type='button'
        label='right-scroll-btn'
        className='right-scroll-btn'
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

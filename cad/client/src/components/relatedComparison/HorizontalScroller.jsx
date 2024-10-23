import React, { useState, useEffect, useRef } from 'react';

const HorizontalScroller = ({ children }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft + 100 < scrollWidth - clientWidth);
  };

  const scrollToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
      scrollContainerRef.current.addEventListener('scrollend', () => {
        handleScroll();
      });
    }
  };

  const scrollToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
      scrollContainerRef.current.addEventListener('scrollend', () => {
        handleScroll();
      });
    }
  };

  const handleDefaultArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      if (scrollWidth > clientWidth) {
        setShowRightButton(true);
      } else {
        setShowRightButton(false);
        setShowLeftButton(false);
      }
    }
  };

  useEffect(() => {
    handleDefaultArrows();
  }, [children]);

  useEffect(() => {
    window.addEventListener('resize', handleDefaultArrows);
    return () => {
      window.removeEventListener('resize', handleDefaultArrows);
    };
  }, []);

  return (
    <div className='cards-scroller'>
      {showLeftButton
      && (
      <button
        type='button'
        label='left-scroll-btn'
        className='left-scroll-btn'
        onClick={scrollToLeft}
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
      <div className='cards-container' ref={scrollContainerRef}>
        {children}
      </div>
      {showRightButton
      && (
      <button
        type='button'
        label='right-scroll-btn'
        className='right-scroll-btn'
        onClick={scrollToRight}
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

export default HorizontalScroller;

import React from 'react';

const ReviewSectionFooter = ({
  backText,
  backFlag,
  backFn,
  nextText,
  nextFlag,
  nextFn,
}) => {
  const handleNext = (e) => {
    if (nextFlag) {
      nextFn(e);
    }
  };

  return (
    <div className='add-review-section-footer'>
      {!!backFlag
      && (
        <button
          onClick={(e) => { backFn(e); }}
          type='button'
        >
          {backText}
        </button>
      )}
      {!!nextFlag
      && (
        <button
          onClick={(e) => { handleNext(e); }}
          type='button'
        >
          {nextText}
        </button>
      )}
    </div>
  );
};

export default ReviewSectionFooter;

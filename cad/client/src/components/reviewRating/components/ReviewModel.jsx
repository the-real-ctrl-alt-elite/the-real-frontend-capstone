import React, { useState, useEffect } from 'react';

const ReviewModel = ({status}) => {
  //

  return (
    <div
      className={`${status}`}
    >
      I&apos;m a review model!
    </div>
  );
};

export default ReviewModel;

import React, { useState, useEffect } from 'react';

const ReviewPictureModel = ({ pictureModelStatus }) => {
  const url = pictureModelStatus[0];
  const top = pictureModelStatus[1];
  return (
    <div
      style={{ top: `${top}` }}

    >
      <div
        className='modelPictureContainer'
      >
        <img
          className='innerModelPicture'
          alt=''
          src={url}
        />
      </div>
    </div>
  );
};

export default ReviewPictureModel;

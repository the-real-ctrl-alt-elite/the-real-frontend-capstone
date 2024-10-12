import React, { useState, useEffect } from 'react';

const ReviewPictureModel = ({ status, setStatus }) => {
  //

  return (
    <div
      style={{top: `${status[2]}`}}
      className={`${status[0]}`}>
      <div
        className='modelPictureContainer'
      >
        <img
          className='innerModelPicture'
          alt=''
          src={status[1]}
        />
        <button
          onClick={() => { setStatus(['closed', '', 0]); }}
          className='reviewModelClose'
          type='button'
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ReviewPictureModel;

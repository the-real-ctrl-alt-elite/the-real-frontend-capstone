import React, { useState, useEffect } from 'react';


const ReviewPictureModel = ({ pictureModelStatus }) => {

  // status contains 3 variables in an array:
  // the first is whatever className you want to use for
  // conditional rendering. The second is for the imgURL
  // and the third is for the scrollheight of the user
  // so that you can have the model appear in the center of
  // their view whenever it's activated. You can get that
  // value by having your onClick to trigger the state
  // change to get document.body.scrollTop and pass that
  // in as the 3rd index in your status array
  // I can also pass along css things needed to really make
  // this thing work.

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

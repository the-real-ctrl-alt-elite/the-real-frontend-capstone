import React from 'react';

const Photos = ({ photos }) => {
  console.log('photos array: ', photos);
  return (
    <div>
      {
        photos ? photos.map((photo, key) => {
          return (
            <img key={`${key}id`} src={photo.url} alt='buyer pictures' className='buyer-photos' />
          );
        })
          : <p key={`${key}id`}>this supposed to have some pictures</p>
      }
    </div>
  );
};

export default Photos;

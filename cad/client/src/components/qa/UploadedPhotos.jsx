import React from 'react';

const UploadedPhotos = ({ urls }) => {
  return (
    <div>
      {urls.map((url) => {
        return <img className='uploadedImg' src={url} alt='uploaded pic' />;
      })}
    </div>
  );
};
export default UploadedPhotos;

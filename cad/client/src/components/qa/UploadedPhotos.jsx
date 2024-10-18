import React from 'react';

const UploadedPhotos = ({ urls }) => {
  console.log('urls in uploadedPhotos', urls);
  return (
    <div>
      {urls.map((url) => {
        return <img className='uploadedImg' src={url} alt='uploaded pic' />;
      })}
    </div>
  );
};
export default UploadedPhotos;

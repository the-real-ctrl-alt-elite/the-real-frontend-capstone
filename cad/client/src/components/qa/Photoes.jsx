import React, { useState } from 'react';
import ModalBackground from '../reviewRating/components/ModalBackground';

const Photos = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleImageClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div>
      {photos && photos.length > 0 && (
        photos.map((photo, key) => (
          <img
            key={`${key}id`}
            src={photo.url}
            alt='buyer pictures'
            className='buyer-photos'
            onClick={() => handleImageClick(photo.url)}
            style={{
              cursor: 'pointer', width: 'auto', height: '100px', margin: '5px', objectFit: 'cover',
            }}
          />
        )))}
      {selectedPhoto
      && (
      <ModalBackground
        component={ModalPhotoContent}
        componentProps={{
          selectedPhoto,
        }}
        closeModal={handleCloseModal}
      />
      )}
    </div>
  );
};

export default Photos;

const ModalPhotoContent = ({ selectedPhoto }) => {
  return (
    <img src={selectedPhoto} alt='Selected' style={{ maxWidth: '50dvw', maxHeight: '50dvh' }} />
  );
};

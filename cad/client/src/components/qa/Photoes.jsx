import React, { useState } from 'react';

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
      {photos && photos.length > 0 ? (
        photos.map((photo, key) => (
          <img
            key={`${key}id`}
            src={photo.url}
            alt='buyer pictures'
            className='buyer-photos'
            onClick={() => handleImageClick(photo.url)}
            style={{
              cursor: 'pointer', width: '100px', height: '100px', margin: '5px',
            }} // Adjust size as needed
          />
        ))
      ) : (
        <p>this supposed to have some pictures</p>
      )}

      {selectedPhoto && (
        <div className='image-modal-overlay' onClick={handleCloseModal}>
          <div className='image-modal' onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto} alt='Selected' style={{ maxWidth: '90%', maxHeight: '90%' }} />
            <button className='close-button' onClick={handleCloseModal}>X</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Photos;

// import React from 'react';

// const Photos = ({ photos }) => {
//   // console.log('photos array: ', photos);
//   return (
//     <div>
//       {
//         photos ? photos.map((photo, key) => {
//           return (
//             <img key={`${key}id`} src={photo.url} alt='buyer pictures' className='buyer-photos' />
//           );
//         })
//           : <p key={`${key}id`}>this supposed to have some pictures</p>
//       }
//     </div>
//   );
// };

// export default Photos;

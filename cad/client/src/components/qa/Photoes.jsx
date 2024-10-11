import React from 'react';

const Photoes = ({ photos }) => {

  return (
    <div>
      {
        photos ? photos.map((photo, key) => {
          return (
            <img key={`${key}id`} alt='pictures from buyer' />
          );
        })
          :
          <p key={`${key}id`} >this supposed to have some pictures</p>
      }
    </div>
  );
};

export default Photoes;

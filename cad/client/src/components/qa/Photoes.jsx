import React from 'react';

const Photoes = ({ photos }) => {
  return (
    <div>
      {photos ? photos.map((photo) => {
        return (
          <img src={photo} alt='pictures from buyer' />
        );
      }) : <p>this supposed to have some pictures</p>}
    </div>
  );
};

export default Photoes;

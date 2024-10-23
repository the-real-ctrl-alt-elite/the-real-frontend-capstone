import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';

const Imagegallery = ({
  item, styleId, details,
}) => {
  const [enlarge, setEnlarge] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const [img, setImg] = useState('');

  useEffect(() => {
    setImgIdx(0);
  }, [styleId]);

  const galleryImages = details[0]?.photos.map((photo) => photo.url);
  const galleryThumbnails = details[0]?.photos.map((photo) => photo.thumbnail_url);

  const handleEnlargeClick = (image) => {
    setImg(image);
    setEnlarge(true);
  };

  if (details.length > 0) {
    return (
      <div className='image-container'>
        <div className='thumbnails-gallery'>
          {
            galleryThumbnails.map((thumbnail, idx) => {
              const { length } = galleryThumbnails.length;
              return (
                <div className={length < 3 ? 'thumbnail-col' : 'thumbnail-row'} key={thumbnail}>
                  <button type='button' onClick={() => setImgIdx(idx)}>
                    <img className='thumbnails' src={thumbnail} alt='thumbnail-photo' />
                  </button>
                </div>
              );
            })
          }
        </div>
        <Gallery images={galleryImages} imgIdx={imgIdx} handleEnlargeClick={handleEnlargeClick} />
        {enlarge && (
        <div className='modal-overlay' onClick={() => setEnlarge(!enlarge)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <img
              className='enlarged-image'
              src={img}
              alt={item.name}
            />
          </div>
        </div>
        )}
      </div>
    );
  }
};

export default Imagegallery;

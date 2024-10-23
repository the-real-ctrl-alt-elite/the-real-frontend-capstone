import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';

const Imagegallery = ({
  item, styleId, details,
}) => {
  const [enlarge, setEnlarge] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    setImgIdx(0);
  }, [styleId]);

  const galleryImages = details[0]?.photos.map((photo) => photo.url);
  const galleryThumbnails = details[0]?.photos.map((photo) => photo.thumbnail_url);

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
        <div
          className='main-image-div'
        >
          <img
            className='main-image-container'
            src={!props.imageTracker.style_photo ? props.imageTracker.original_url : props.imageTracker.style_url}
            alt={props.item.name}
            onClick={() => setEnlarge(!enlarge)}
          />
        </div>
        {
          enlarge && (
            <div className='modal-overlay' onClick={() => setEnlarge(!enlarge)}>
              <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <img
                  className='enlarged-image'
                  src={imageTracker.style_photo ? imageTracker.style_url : imageTracker.original_url}
                  alt={item.name}
                />
              </div>
            </div>
          )
        }
      </div>
    );
  }
};

export default Imagegallery;

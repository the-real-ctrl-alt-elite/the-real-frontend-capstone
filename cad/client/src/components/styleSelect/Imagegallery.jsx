import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';

const Imagegallery = ({
  item, setImageTracker, id, details, imageTracker,
}) => {
  const [enlarge, setEnlarge] = useState(false);

  const photoSwap = (url) => {
    setImageTracker((prev) => ({
      ...prev,
      original_url: url,
    }));
  };
  const galleryImages = item?.photos?.map((photo) => photo.url) ?? [];

  if (details.length > 0) {
    return (
      <div className='image-container'>
        <div className='thumbnails-gallery'>
          {
            item && item?.photos.map((photo, i) => {
              const { length } = item.photos;
              return (
                <div className={length < 3 ? 'thumbnail-col' : 'thumbnail-row'} key={photo.url}>
                  {/* <img className='thumbnails' src={photo.thumbnail_url} onClick={() => photoSwap(photo.thumbnail_url)} /> */}
                  <button type='button' onClick={() => photoSwap(photo.thumbnail_url)}>
                    <img className='thumbnails' src={photo.thumbnail_url} alt='thumbnail-photo' />
                  </button>
                </div>
              );
            })
          }
        </div>
        <Gallery data={galleryImages} />
        {/* <img
          className='main-image-container'
          src={!props.imageTracker.style_photo ?  props.imageTracker.original_url : props.imageTracker.style_url}
          alt={props.item.name}
          onClick={() => setEnlarge(!enlarge)}
        /> */}
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

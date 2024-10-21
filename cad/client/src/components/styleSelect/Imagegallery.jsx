import React, { useState, useEffect, } from 'react';

const Imagegallery = (props) => {

  const [enlarge, setEnlarge] = useState(false);

  const photoSwap = (url, new_url, bool) => {
    props.setImageTracker(prev => ({
      ...prev,
      original_url: url
    }))
  }
  useEffect(() => {
  }, [props.id]);

  if (props.details.length > 0) {
    return (
      <div className='image-container'>
        <div className='thumbnails-gallery'>
          {
            props.item > 0 && props.item.photos.map((photo, i) => {
              const length = props.item.photos.length;
              return <div className={length < 3 ? 'thumbnail-col' : 'thumbnail-row'} key={photo.url}>
                <img className='thumbnails' src={photo.thumbnail_url} onClick={() => photoSwap(photo.thumbnail_url)} />
                <img className='thumbnails' src={photo.url} onClick={() => photoSwap(photo.url)} />
              </div>
            })
          }
        </div>
        <img
          className='main-image-container'
          src={props.imageTracker.style_photo ? props.imageTracker.style_url : props.imageTracker.original_url}
          alt={props.item.name}
          onClick={() => setEnlarge(!enlarge)}
        />
        {
          enlarge && (
            <div className="modal-overlay" onClick={() => setEnlarge(!enlarge)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img
                  className='enlarged-image'
                  src={props.imageTracker.style_photo ? props.imageTracker.style_url : props.imageTracker.original_url}
                  alt={props.item.name}
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

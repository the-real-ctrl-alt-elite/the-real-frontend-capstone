import React, { useState, useEffect, } from 'react';
import axios from 'axios';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;

const Imagegallery = (props) => {
  // console.log('propsImage', props.imageTracker)
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
            props.item && props.item.photos.map((photo, i) => {
              const length = props.item.photos.length;
              return <div className={length < 3 ? 'thumbnail-col' : 'thumbnail-row'} key={photo.url}>
                <img className='thumbnails' src={photo.url} onClick={() => photoSwap(photo.url)} />
                <img className='thumbnails' src={photo.thumbnail_url} onClick={() => photoSwap(photo.thumbnail_url)} />
              </div>
            })
          }
        </div>
        <img
          className='main-image-container'
          src={props.imageTracker.style_photo ? props.imageTracker.style_url : props.imageTracker.original_url}
          alt={props.item.name}
        />
      </div>
    );
  }

};

export default Imagegallery;

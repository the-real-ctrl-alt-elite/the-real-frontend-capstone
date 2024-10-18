import React, { useState, useEffect, } from 'react';
import axios from 'axios';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;

const Imagegallery = (props) => {
  const [details, setDetails] = useState([]);
  const [item, setItem] = useState({});
  const [photo, setPhoto] = useState('');

  const showSelectedItem = () => {
    if (props.id !== null) {
      const url = `${BASE_URL}${CAMPUS_CODE}/products/${props.id}/styles`;
      axios
        .get(url, {
          headers: {
            Authorization: TOKEN,
          },
        })
        .then((response) => {
          setDetails(response.data.results);
          response.data.results.map((item) => item['default?'] && setItem(item))
          setPhoto(response.data.results[0].photos[0].url)
        })
        .catch((err) => console.error(err));
    }
  };

  const photoSwap = (url) => {
    setPhoto(url);
    
  }
  useEffect(() => {
    showSelectedItem();
  }, [props.id]);

  if (details.length > 0) {
    return (
      <div className='image-container'>
        <div className='thumbnails-gallery'>
          {
            item && item.photos.map((photo, i) => {
              const length = item.photos.length;
              return <div className={length < 3 ? 'thumbnail-col' : 'thumbnail-row'} key={photo.url}>
                <img className='thumbnails' src={photo.url} onClick={() => photoSwap(photo.url)} />
                <img className='thumbnails' src={photo.thumbnail_url} onClick={() => photoSwap(photo.thumbnail_url)} />
              </div>
            })
          }
        </div>
        <img
          className='main-image-container'
          src={photo}
          alt={item.name}
        />
      </div>
    );
  }

};

export default Imagegallery;

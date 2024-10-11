import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;



const Imagegallery = (props) => {
  const [details, setDetails] = useState([]);
  const [item, setItem] = useState({});
  const [photo, setPhoto] = useState('');

  const showSelectedItem = () => {
    const url = `${BASE_URL}${CAMPUS_CODE}/products/${props.id}/styles`;
    axios
      .get(url, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((response) => {
        setDetails(response.data.results);
        response.data.results.map((item) => item['default?'] ? setItem(item) : null)
        setPhoto(response.data.results[0].photos[0].url)
      })
      .catch((err) => console.error(err));
  };


  const photoSwap = (url) => {
    setPhoto(url);
  }
  useEffect(() => {
    if (props.id !== undefined) {
      showSelectedItem();
    }
  }, [props.id]);

  // console.log('detailsState:', details);
  console.log('itemState:', item);
  if (details.length > 0) {
    return (
      <div className='image-container'>
        <div className='thumbnails-gallery'>
          {
            item && item.photos.map((photo) => {
              return <img className='thumbnails' src={photo.url} onClick={() => photoSwap(photo.url)} />
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

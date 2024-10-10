import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;


const Imagegallery = (props) => {
  const [details, setDetails] = useState([]);
  const [item, setItem] = useState({});

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
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (props.id !== undefined) {
      showSelectedItem();
    }
  }, [props.id]);

  if (details.length > 0) {

    // console.log('detailsState:', details);
    // console.log('itemState:', item);

    return (
      <div className='image-container'>
        <div className='thumbnails-gallery'>
          {
            item && item.photos.map((photo) => {
              return <img className='thumbnails' src={photo.thumbnail_url} />
            })
          }
        </div>
        <img
          className='main-image-container'
          src={item.photos[1].url}
          alt={item.name}
        />
      </div>
    );
  }

};

export default Imagegallery;

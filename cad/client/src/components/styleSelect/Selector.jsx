import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Imagegallery from './Imagegallery';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;


const Selector = (props) => {
  const url = `${BASE_URL}${CAMPUS_CODE}/products`;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: TOKEN,
        },
        params: {
          count: 10,
        },
      })
      .then((response) => {
        console.log(('api response:', response.data));
        setProducts(response.data);
      })
      .catch((err) => {
        console.error('Error origin: selector useeffect', err);
      })
  }, []);

  return (
    <div className='selector-container'>
      <article className='selector-advertisement'>ads</article>
      <div className='selector-components'>
        <Imagegallery />
        <aside className='selector-functional-components'>

        </aside>
      </div>
    </div>
  );
};

export default Selector;

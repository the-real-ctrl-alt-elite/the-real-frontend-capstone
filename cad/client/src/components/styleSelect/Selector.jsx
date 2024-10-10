import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Imagegallery from './Imagegallery';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;


const Selector = (props) => {
  const url = `${BASE_URL}${CAMPUS_CODE}/products`;
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [sale, setSale] = useState(null);
  const [saleName, setSaleName] = useState('');

  const generateRandomProductId = () => {
    return Math.floor(Math.random() * (41354 - 40344 + 1)) + 40344;
  };

  const fetchSaleItem = () => {
    const randomId = generateRandomProductId();
    const url_price = `${BASE_URL}${CAMPUS_CODE}/products/${randomId}/styles`;
    const url_name = `${BASE_URL}${CAMPUS_CODE}/products/${randomId}`;

    axios
      .get(url_price, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((response) => {
        const saleItem = response.data.results.find(
          (item) => item.sale_price !== null);
        if (saleItem) {
          axios
            .get(url_name, {
              headers: {
                Authorization: TOKEN,
              },
            })
            .then((response) => setSaleName(response.data.name))
          setSale(saleItem);
        } else {
          fetchSaleItem();
        }
      })
      .catch((err) => console.error('error', err));
  };

  const getProduct = () => {
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
        // console.log('api response:', response.data);
        setProducts(response.data);
        setProduct(response.data[0])
      })
      .catch((err) => {
        console.error('Error origin: selector useeffect', err);
      })
  };

  useEffect(() => {
    getProduct();
    fetchSaleItem();
  }, []);

  return (
    <div className='selector-container'>
      <article className='selector-advertisement'>
        {
          sale && <span>{saleName} originally priced at ${sale.original_price} NOW ONLY {sale.sale_price}! </span>
        }
      </article>
      <div className='selector-components'>
        <Imagegallery id={product.id} />
        <aside className='selector-functional-components'>

        </aside>
      </div>
    </div>
  );
};

export default Selector;

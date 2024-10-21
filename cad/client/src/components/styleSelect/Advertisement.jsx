import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductContext from '../../ProductContext';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;
// not randomized
const Advertisement = (props) => {
  const { productId, newProduct } = useContext(ProductContext);
  const [sale, setSale] = useState(null);
  const [saleName, setSaleName] = useState('');
  const [saleId, setSaleId] = useState('');
  const generateRandomProductId = () => {
    return Math.floor(Math.random() * (41354 - 40344 + 1)) + 40344;
  };
  const fetchSaleItem = () => {
    const randomId = generateRandomProductId();
    const url_name = `${BASE_URL}${CAMPUS_CODE}/products/${randomId}`;
    const url_price = `${url_name}/styles`;
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
            .then((response) => {
              setSaleId(response.data.id);
              setSaleName(response.data.name);
            })
          setSale(saleItem);
        } else {
          fetchSaleItem();
        }
      })
      .catch((err) => console.error('error', err));
  };
  useEffect(() => {
    fetchSaleItem();
  }, [productId]);

  return (
    <article className='selector-advertisement' onClick={() => newProduct(saleId)}>
      <a href="#" className='a-tag-ad'>
        {
          sale &&
          <span>
            <strong style={{ fontSize: 'large' }}>{'EVENT ENDS SOON: '}</strong>
            {saleName} originally priced at ${sale.original_price}
            <span className='sale-now'> NOW ONLY </span>
            <strong><em style={{ textDecoration: 'underline' }}>{sale.sale_price}!</em></strong>
          </span>
        }
      </a>
    </article>
  );
};

export default Advertisement;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductContext from '../../ProductContext';
import Imagegallery from './Imagegallery';
import Purchaseoption from './Purchaseoption';
import Sizeoptions from './Sizeoptions';
import Styleoptions from './Styleoptions';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;

const Selector = (props) => {
  const { productId } = useContext(ProductContext);
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
    const url = `${BASE_URL}${CAMPUS_CODE}/products/${productId}`;
    axios
      .get(url, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.error('Error origin: selector getProduct', err);
      })
  };

  useEffect(() => {
    productId && getProduct();
    fetchSaleItem();
  }, [productId]);

  return (
    <div className='selector-container-overlay'>
      <article className='selector-advertisement'>
        {
          sale &&
          <span>
            <strong style={{ fontSize: 'large' }}>{'EVENT ENDS SOON: '}</strong>
            {saleName} originally priced at ${sale.original_price}
            <span className='sale-now'> NOW ONLY </span>
            <strong><em style={{textDecoration: 'underline'}}>{sale.sale_price}!</em></strong>
          </span>
        }
      </article>

      <div className='selector-components'>
        <Imagegallery id={productId} />
        <aside className='selector-functional-components'>
          <div className='info-choices-container'>
            <h1 className='product-name'>
              {product.name}
            </h1>
            <Sizeoptions />

          </div>
          <div className='purchase-div'>

          </div>
        </aside>
      </div>
    </div>
  );
};

export default Selector;

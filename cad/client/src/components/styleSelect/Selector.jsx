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
  const { productId, newProduct } = useContext(ProductContext);
  const [productInformation, setProduct] = useState({});
  const [productStyles, setProductStyles] = useState({});

  const [sale, setSale] = useState(null);
  const [saleName, setSaleName] = useState('');
  const [saleId, setSaleId] = useState('');

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

  const getProduct = () => {
    const url = `${BASE_URL}${CAMPUS_CODE}/products/${productId}`;
    axios
      .get(url, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((response) => {
        axios
          .get(`${url}/styles`, {
            headers: {
              Authorization: TOKEN,
            },
          })
          .then((response) => {
            setProductStyles(response.data.results);
          })
          .catch((err) => console.error('error on selector', err));
        setProduct(response.data);
      })
      .catch((err) => console.error('Error origin: selector getProduct', err));
  };

  useEffect(() => {
    productId && getProduct();
    fetchSaleItem();
  }, [productId]);

  console.log('Selector:\n', 'Info:', productInformation, '\n', 'Style:', productStyles)
  return (
    <div className='selector-container-overlay'>
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

      <div className='selector-components'>
        <Imagegallery id={productId} />
        <aside className='selector-functional-components'>
          <div className='info-choices-container'>
            <h1 className='product-name'>
              Category: {productInformation.category}
              Name:{productInformation.name}
              {/* bring from styles for % change */}
              Price:{productInformation.default_price}
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


/*
Product Information
{
  "id": 11,
  "name": "Air Minis 250",
  "slogan": "Full court support",
  "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
  "category": "Basketball Shoes",
  "default_price": "0",
  "features": [
    {
      "feature": "Sole",
      "value": "Rubber"
    },
    {
      "feature": "Material",
      "value": "FullControlSkin"
    },
    // ...
  ],
}

Product Syles
{
  "product_id": "1",
  "results": [
    {
      "style_id": 1,
      "name": "Forest Green & Black",
      "original_price": "140",
      "sale_price": "0",
      "default?": true,
      "photos": [
        {
          "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
          "url": "urlplaceholder/style_1_photo_number.jpg"
        },
        {
          "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
          "url": "urlplaceholder/style_1_photo_number.jpg"
        }
      ],
    "skus": {
        "37": {
                "quantity": 8,
                "size": "XS"
        },
        "38": {
                "quantity": 16,
                "size": "S"
        },
        "39": {
                "quantity": 17,
                "size": "M"
        },
  {
    "style_id": 2,
    "name": "Desert Brown & Tan",
    "original_price": "140",
    "sale_price": "0",
    "default?": false,
    "photos": [
        {
          "thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
          "url": "urlplaceholder/style_2_photo_number.jpg"
        }
      ],
    "skus": {
        "37": {
                "quantity": 8,
                "size": "XS"
        },
        "38": {
                "quantity": 16,
                "size": "S"
        },
        "39": {
                "quantity": 17,
                "size": "M"
        },
}
  */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductContext from '../../ProductContext';
import Imagegallery from './Imagegallery';
import Sizeoptions from './Sizeoptions';
import Styleoptions from './Styleoptions';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;

const Selector = (props) => {
  const { productId, newProduct } = useContext(ProductContext);
  const [productInformation, setProduct] = useState({});
  const [productStyles, setProductStyles] = useState({});

  const [money, setMoney] = useState({ dollar: '', cent: '' })

  const [imageTracker, setImageTracker] = useState('');

  const [selectedSize, setSelectedSize] = useState('');
  const [sizeArray, setSizeArray] = useState([]);

  const [isSale, setIsSale] = useState(null);


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

            setSelectedSize(Object.values(response.data.results[0].skus)[0].size)
            setProductStyles(response.data.results);
          })
          .catch((err) => console.error('error on selector', err));
        const [dollar, cent] = response.data.default_price.split('.');
        setMoney(prevState => ({
          ...prevState,
          dollar: dollar,
          cent: cent
        }))
        setProduct(response.data);
      })
      .catch((err) => console.error('Error origin: selector getProduct', err));
  };
  const handleImage = (image) => {
    setImageTracker(image);
  }

  useEffect(() => {
    productId && getProduct();
    fetchSaleItem();
  }, [productId]);
  // console.log('Selector:\n', 'productInformation:', productInformation, '\n', 'productStyle:', productStyles)
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
        <Imagegallery id={productId} handleImage={handleImage} />
        <aside className='selector-functional-components'>
          <div className='info-choices-container'>
            <div className='category'>
              <p>Category:</p>
              <p>{productInformation.category}</p>
            </div>
            <h1 className='product-name'>{productInformation.name}</h1>
            <div className='ratings-container'>
              <div className='rate-star'>
                <div className='sel-rating'>3.6</div>
                <div className='stars-div'>
                  <div className='stars-hollow'>&#9734;&#9734;&#9734;&#9734;&#9734;</div>
                  <div className='stars-solid'>&#9733;</div>
                </div>
              </div>
              <div className='review-links'>
                <div className='total-rat'><a href='#' className='total-rat'>Ratings</a></div> |
                <div className='sel-reviews'><a href='#' className='sel-reviews'>Customer reviews</a></div>
              </div>
            </div>


            <hr className='hr-class' />
            {/* bring from styles for % change */}
            <div className='price-div'>
              <sup>$</sup>
              <span className='price'>{money.dollar}</span>
              <sup style={{ textDecoration: 'underline' }}>{money.cent}</sup>
            </div>
            {
              productStyles && <Sizeoptions
              sizes={productStyles}
              changeSize={setSelectedSize}
              seeSize={selectedSize}
              />
            }

            {
              productStyles && <Styleoptions styles={productStyles} />
            }
            <div className='information-section'>
              <h1 className='about-item'>About this item</h1>
              <p className='description'>
                {productInformation.description}
              </p>
              <div className='slogan'>
                <h1 className='about-item'>Slogan:</h1>
                {productInformation.slogan}
              </div>
            </div>
          </div>
          <div className='purchase-div'>
            <div className='checkout-container'>
              <div className='price-div'>
                <sup>$</sup>
                <span className='price'>{money.dollar}</span>
                <sup style={{ textDecoration: 'underline' }}>{money.cent}</sup>
              </div>
            </div>
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
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductContext from '../../ProductContext';
import Imagegallery from './Imagegallery';
import Sizeoptions from './Sizeoptions';
import Styleoptions from './Styleoptions';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;

const Selector = (props) => {
  const { productId, newProduct, starCount, reviewCount } = useContext(ProductContext);
  const [productInformation, setProduct] = useState({});
  const [productStyles, setProductStyles] = useState({});

  // stores mutations for styles on current page
  const [money, setMoney] = useState({ dollar: '', cent: '' })
  const [star, setStar] = useState({ full: [], part: '', hollow: [] });

  //used in size options
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeArray, setSizeArray] = useState([]);

  // advertisement related
  const [sale, setSale] = useState(null);
  const [saleName, setSaleName] = useState('');
  const [saleId, setSaleId] = useState('');

  // attempt to keep track of styles pics - unused
  const [imageTracker, setImageTracker] = useState({ original_url: '', style_url: '', style_photo: false });
  const [details, setDetails] = useState([])
  const [item, setItem] = useState({});
  // needed to compute sale price difference but unused still
  const [isSale, setIsSale] = useState({ original_price: 0, sale_price: 0, percent_change: '' });

  const generateRandomProductId = () => {
    return Math.floor(Math.random() * (41354 - 40344 + 1)) + 40344;
  };
  const makeStarParts = () => {
    if (starCount !== null) {
      const starNumPercent = starCount.toFixed(2);
      const splits = starNumPercent.split('.');
      const num = splits[0];
      const percent = splits[1];

      let starArr = [], hollowArr = [];
      for (let i = 0; i < num; i++) {
        starArr.push('★')
      }
      setStar(prev => ({
        ...prev,
        full: starArr,
        part: percent
      }));
    }
  }

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
            Object.values(response.data.results[0].skus).forEach(item => setSizeArray(prevArray => prevArray.concat(item.size)));
            setSelectedSize(Object.values(response.data.results[0].skus)[0].size);
            setProductStyles(response.data.results);
            setDetails(response.data.results);
            response.data.results.map((item) => item['default?'] && setItem(item));
            setImageTracker(prev => ({
              ...prev,
              original_url: response.data.results[0].photos[0].url,
              style_url: '',
              style_photo: false
            }));
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

  useEffect(() => {
    productId && getProduct();
    fetchSaleItem();
    makeStarParts();
  }, [productId, starCount]);
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
        <Imagegallery
         id={productId}
         details={details}
         item={item}
         setImageTracker={setImageTracker}
         imageTracker={imageTracker}
         />
        <aside className='selector-functional-components'>
          <div className='info-choices-container'>
            <div className='category'>
              <p>Category:</p>
              <p>{productInformation.category}</p>
            </div>
            <h1 className='product-name'>{productInformation.name}</h1>
            <div className='ratings-container'>
              <div className='rate-star'>
                <div className='sel-rating'>{starCount && starCount.toFixed(1)}</div>
                <div className='stars-div'>
                  <div className='stars-hollow'>&#9734;&#9734;&#9734;&#9734;&#9734;</div>
                  <div className='stars-solid-cont'>
                    {
                      star.full.map((solidStar, index) => {
                        return <span className='stars-solid' key={index}>{solidStar}</span>
                      })
                    }
                    {
                      starCount < 5 && <span
                        className='star-part'
                        style={{
                          background: `linear-gradient(to right, goldenrod ${star.part}%, transparent ${star.part}%)`
                        }}
                      >&#9733;</span>
                    }

                  </div>
                </div>
              </div>
              <div className='review-links'>
                <div className='total-rat'><Link to='#rating' className='total-rat'>Ratings</Link></div> |
                <div className='sel-reviews'><Link to='#review' className='sel-reviews'>{reviewCount} Customer reviews</Link></div>
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
                productStyles={productStyles}
                setSelectedSize={setSelectedSize}
                sizeArray={sizeArray}
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
      </div >
    </div >
  );
};

export default Selector;

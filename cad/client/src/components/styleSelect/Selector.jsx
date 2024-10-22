import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductContext from '../../ProductContext';
import Advertisement from './Advertisement';
import Imagegallery from './Imagegallery';
import Sizeoptions from './Sizeoptions';
import Styleoptions from './Styleoptions';
import Purchase from './Purchase';
import { ReviewStars } from '../reviewRating/components/ReviewTile';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const { CAMPUS_CODE } = process.env;

const Selector = (props) => {
  const {
    productId, newProduct, starCount, reviewCount,
  } = useContext(ProductContext);
  const [productInformation, setProduct] = useState({});
  const [productStyles, setProductStyles] = useState({});

  // stores mutations for styles on current page
  const [money, setMoney] = useState({ dollar: '', cent: '' });
  const [star, setStar] = useState({ full: [], part: '', hollow: [] });

  // used in size options
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeArray, setSizeArray] = useState([]);

  // advertisement related
  const [sale, setSale] = useState(null);
  const [saleName, setSaleName] = useState('');
  const [saleId, setSaleId] = useState('');

  // keep track of styles pics
  const [imageTracker, setImageTracker] = useState({ original_url: '', style_url: '', style_photo: false });
  const [item, setItem] = useState({});
  const [isSale, setIsSale] = useState(null);
  const [currentStyle, setCurrentStyle] = useState(
    {
      original_price: 0,
      sale_price: 0,
      percent_change: '',
      color: '',
      newColor: '',
      colorCheck: false,
    },
  );

  const generateRandomProductId = () => {
    return Math.floor(Math.random() * (41354 - 40344 + 1)) + 40344;
  };
  const makeStarParts = () => {
    if (starCount !== null) {
      const starNumPercent = starCount.toFixed(2);
      const splits = starNumPercent.split('.');
      const num = splits[0];
      const percent = splits[1];

      const starArr = []; const
        hollowArr = [];
      for (let i = 0; i < num; i++) {
        starArr.push('★');
      }
      setStar((prev) => ({
        ...prev,
        full: starArr,
        part: percent,
      }));
    }
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
          (item) => item.sale_price !== null,
        );
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
            });
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
            const res = response.data.results;
            Object.values(res[0].skus).forEach((item) => setSizeArray((prevArray) => prevArray.concat(item.size)));
            setSelectedSize(Object.values(res[0].skus)[0].size);
            setProductStyles(res);
            res.map((item) => item['default?'] && setItem(item));
            res.map((item) => (item['default?'] & item.sale_price !== null) && setIsSale(true));
            setImageTracker((prev) => ({
              ...prev,
              original_url: res[0].photos[0].url,
              style_url: '',
              style_photo: false,
            }));
            const salePrice = res[0].sale_price !== null
              ? res[0].sale_price : null;
            const percentChange = salePrice !== null
              ? (((+salePrice - +res[0].original_price) / +salePrice) * 100).toFixed(0) : null;
            setCurrentStyle((prev) => ({
              ...prev,
              original_price: res[0].original_price,
              sale_price: salePrice,
              percent_change: percentChange,
              color: res[0].name,
            }));
          })
          .catch((err) => console.error('error on selector', err));
        const [dollar, cent] = response.data.default_price.split('.');
        setMoney((prevState) => ({
          ...prevState,
          dollar,
          cent,
        }));
        setProduct(response.data);
      })
      .catch((err) => console.error('Error origin: selector getProduct', err));
  };

  useEffect(() => {
    productId && getProduct();
    // fetchSaleItem();
    makeStarParts();
  }, [productId, starCount]);
  // if (Object.keys(productStyles).length > 0) {
  //   console.log(currentStyle)
  //   console.log('Selector:\n', 'productInformation:', productInformation, '\n', 'productStyle:', productStyles)
  // }
  return (
    <div className='selector-container-overlay'>
      <article className='selector-advertisement' onClick={() => newProduct(saleId)}>
        <a href='#' className='a-tag-ad'>
          {
            sale
            && (
            <span>
              <strong style={{ fontSize: 'large' }}>{'EVENT ENDS SOON: '}</strong>
              {saleName}
              {' '}
              originally priced at $
              {sale.original_price}
              <span className='sale-now'> NOW ONLY </span>
              <strong>
                <em style={{ textDecoration: 'underline' }}>
                  {sale.sale_price}
                  !
                </em>
              </strong>
            </span>
            )
          }
        </a>
      </article>

      <div className='selector-components'>
        <Imagegallery
          id={productId}
          details={productStyles}
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
              <ReviewStars rating={starCount} />

              <div className='review-links'>
                <div className='total-rat'>
                  <button
                    type='button'
                    className='button-link-top'
                    onClick={() => document.querySelector('#ratings').scrollIntoView()}
                  >
                    {`Read All ${reviewCount} Reviews`}
                  </button>
                </div>
              </div>
            </div>
            <hr className='hr-class' />
            <div className='price-div'>
              {
                currentStyle.sale_price ? (
                  <div className='price-sale-div'>
                    <div className='sale-price'>
                      <sup>$</sup>
                      <span className='price'>{currentStyle.sale_price}</span>
                    </div>
                    <div className='original-price'>
                      Originally:
                      {' '}
                      <span className='strikethrough'>
                        <sup>$</sup>
                        {currentStyle.original_price}
                      </span>
                    </div>
                    <div className='percent-discount'>
                      <strong>
                        -
                        {Math.abs(+currentStyle.percent_change)}
                        %
                      </strong>
                    </div>
                  </div>
                ) : (
                  <div>
                    <sup>$</sup>
                    <span className='price'>{money.dollar}</span>
                    <sup style={{ textDecoration: 'underline' }}>{money.cent}</sup>
                  </div>
                )
              }
            </div>
            {
              productStyles && (
              <Sizeoptions
                productStyles={productStyles}
                setSelectedSize={setSelectedSize}
                sizeArray={sizeArray}
              />
              )
            }

            {
              productStyles && (
              <Styleoptions
                productStyles={productStyles}
                setImageTracker={setImageTracker}
                imageTracker={imageTracker}
                setCurrentStyle={setCurrentStyle}
                currentStyle={currentStyle}
              />
              )
            }
            <div className='information-section'>
              <div className='details-container'>
                <h3 className='datails-title'>Product Details</h3>
                <ul className='details-ul'>
                  {
                    Object.keys(productInformation).length > 0
                    && productInformation.features
                      .filter((item) => item.value !== null)
                      .reduce((uniqueFeatures, item) => {
                        if (!uniqueFeatures.some((feature) => feature.feature === item.feature)) {
                          uniqueFeatures.push(item);
                        }
                        return uniqueFeatures;
                      }, [])
                      .map((item, key) => {
                        return (
                          <li key={key + 99} className='details-li'>
                            <div className='li-div1'>{item.feature}</div>
                            <div className='li-div2'>{item.value}</div>
                          </li>
                        );
                      })
                  }
                </ul>
              </div>
              <hr className='hr-class' />
              <div className='about-item-cont'>
                <h3 className='about-item'>About this item</h3>
                <p className='description'>
                  {productInformation.description}
                </p>
              </div>
              <div className='slogan'>
                <h3 className='about-item'>Slogan</h3>
                {productInformation.slogan}
              </div>
              <hr className='hr-class' />
              <div className='icon-div'>
                <a label='link-to-fb' target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/'>
                  <div className='social-icons'>
                    <i className='fa-brands fa-facebook' />
                  </div>
                </a>
                <a label='link-to-pinterest' target='_blank' rel='noopener noreferrer' href='https://www.pinterest.com/'>
                  <div className='social-icons red'>
                    <i className='fa-brands fa-pinterest' />
                  </div>
                </a>
                <a label='link-to-x' target='_blank' rel='noopener noreferrer' href='https://x.com/?lang=en'>
                  <div className='social-icons black'>
                    <i className='fa-brands fa-x-twitter' />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <Purchase money={money} currentStyle={currentStyle} />
        </aside>
      </div>
    </div>
  );
};

export default Selector;

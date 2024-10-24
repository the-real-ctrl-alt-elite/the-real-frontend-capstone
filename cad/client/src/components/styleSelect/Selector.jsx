import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductContext from '../../ProductContext';
import Imagegallery from './Imagegallery';
import Gallery from './Gallery';
import Sizeoptions from './Sizeoptions';
import Quantity from './Quantity';
import Styleoptions from './Styleoptions';
import { ReviewStars } from '../reviewRating/components/ReviewTile';

// const TOKEN = process.env.GIT_TOKEN;
// const BASE_URL = process.env.API_BASE_URL;
// const { CAMPUS_CODE } = process.env;

const Selector = (props) => {
  const {
    productId,
    newProduct,
    starCount,
    reviewCount,
    sale,
    saleId,
    saleName,
    sizeArray,
    selectedSize,
    setSelectedSize,
    skus,
    setSkus,
    productStyles,
    item,
    isSale,
    imageTracker,
    setImageTracker,
    currentStyle,
    setCurrentStyle,
    shownStyle,
    setShownStyle,
    money,
    productData,
  } = useContext(ProductContext);

  const [selectedSku, setSelectedSku] = useState(null);
  const [availableQuantities, setAvailableQuantities] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [click, setClick] = useState(false);
  const [detailsTracker, setDetailsTracker] = useState({
    original_price: 0,
    sale_price: 0,
    percent_change: '',
    color: '',
    hasSale: false,
  });
  const [hoverState, setHoverState] = useState(
    {
      active: false,
      original_price: 0,
      sale_price: 0,
      percent_change: '',
      color: '',
      newColor: '',
      colorCheck: false,
      index: null,
    },
  );

  const handleSizeChange = (selectedSize) => {
    if (selectedSize === '') {
      setSelectedSize('');
      setSelectedSku(null);
      setAvailableQuantities(0);
      setSelectedQuantity(null);
      return;
    }
    const selectedSku = Object.keys(skus).find((skuId) => skus[skuId].size === selectedSize);
    if (selectedSku) {
      setSelectedSize(selectedSize);
      setSelectedSku(selectedSku);
      setAvailableQuantities(skus[selectedSku].quantity);
    } else {
      setSelectedSku(null);
      setAvailableQuantities(0);
    }
  };
  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleClick = () => {
    setClick(!click);
  };
  const handleMouseLeave = () => {
    setClick(false);
  };

  useEffect(() => {
    if (hoverState === false) {
      setShownStyle({ ...currentStyle });
    } else {
      setShownStyle({ ...shownStyle });
    }
  }, [currentStyle, hoverState]);

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
          styleId={currentStyle?.id || 0}
          details={productStyles.filter((style) => style?.style_id === currentStyle?.id)}
          item={item}
        />
        <aside className='selector-functional-components'>
          <aside className='selector-functional-components'>
            <div className='info-choices-container'>
              <div className='category'>
                <p>Category:</p>
                <p>{productData.category}</p>
              </div>
              <h1 className='product-name'>{productData.name}</h1>
              {reviewCount && starCount
                && (
                  <div className='ratings-container'>
                    <span className='star-num'>{props.starAverage}</span>
                    <ReviewStars rating={props.starAverage} />
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
                )}
              <hr className='hr-class' />
              <div className='price-div'>
                {
                  shownStyle.sale_price !== null ? (
                    <div className='price-sale-div'>
                      <div className='sale-price'>
                        <sup>$</sup>
                        <span className='price'>{shownStyle.sale_price}</span>
                      </div>
                      <div className='original-price'>
                        Originally:
                        {' '}
                        <span className='strikethrough'>
                          <sup>$</sup>
                          {shownStyle.original_price}
                        </span>
                      </div>
                      <div className='percent-discount'>
                        <strong>
                          -
                          {Math.abs(+shownStyle.percent_change)}
                          %
                        </strong>
                      </div>
                    </div>
                  ) : (
                    <div className='price-nosale-div'>
                      <sup>$</sup>
                      <span className='price'>{money.dollar}</span>
                      <sup style={{ textDecoration: 'underline' }}>{money.cent}</sup>
                    </div>
                  )
                }
              </div>
              <div className='drop-down-menus'>
                {
                  productStyles && (
                    <Sizeoptions
                      sizeArray={sizeArray}
                      setSelectedSize={setSelectedSize}
                      setSelectedSku={setSelectedSku}
                      selectedSize={selectedSize}
                      handleSizeChange={handleSizeChange}
                      skus={skus}
                    />
                  )
                }
                {
                  productStyles && (
                    <Quantity
                      availableQuantities={availableQuantities}
                      selectedSku={selectedSku}
                      selectedQuantity={selectedQuantity}
                      onQuantityChange={handleQuantityChange}
                    />
                  )
                }
              </div>
              {
                productStyles && (
                  <Styleoptions
                    productStyles={productStyles}
                    setImageTracker={setImageTracker}
                    imageTracker={imageTracker}
                    setCurrentStyle={setCurrentStyle}
                    currentStyle={currentStyle}
                    shownStyle={shownStyle}
                    setShownStyle={setShownStyle}
                    hoverState={hoverState}
                    setHoverState={setHoverState}
                    setSelectedSize={setSelectedSize}
                    setSelectedSku={setSelectedSku}
                    setAvailableQuantities={setAvailableQuantities}
                    setSkus={setSkus}
                  />
                )
              }
              <div className='purchase-div'>
                {
                  props.pumpkins ?
                    <button
                      style={!click ? { '--content': "'Add T👻 Cart!'" } : { '--content': "'Added ☠️ Cart'" }}
                      className="styled-button"
                      onClick={handleClick}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="left"></div>
                      {
                        !click ? ' Add T👻 Cart!' : 'Added ☠️ Cart'
                      }
                      <div className="right"></div>
                    </button>
                    :
                    <button
                      className="btn-flip"
                      onClick={handleClick}
                      onMouseLeave={handleMouseLeave}
                      data-front="Add to Cart"
                      data-back="Added"
                    >
                    </button>
                }
              </div>
              <div className='information-section'>
                <div className='details-container'>
                  <hr className='hr-class' />
                  <h3 className='details-title'>Product Details</h3>
                  <ul className='details-ul'>
                    {
                      Object.keys(productData).length > 0
                      && productData.features
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
                    {productData.description}
                  </p>
                </div>
                <div className='slogan'>
                  <h3 className='about-item'>Slogan</h3>
                  {productData.slogan}
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
          </aside>
        </aside>
      </div>
    </div>
  );
};

export default Selector;



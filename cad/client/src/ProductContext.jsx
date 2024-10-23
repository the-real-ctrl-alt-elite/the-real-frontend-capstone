import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from './AxiosInstance';

const ProductContext = createContext();
const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const { CAMPUS_CODE } = process.env;

export const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState();
  const [productStyles, setProductStyles] = useState();
  const [starCount, setStarCount] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);

  const generateRandomProductId = () => {
    return Math.floor(Math.random() * (41354 - 40344 + 1)) + 40344;
  };

  const newProduct = (id) => {
    setProductId(id);
  };

  const updateRRCount = (newRatingAvg, newReviewCount) => {
    setrrCount((prevState) => ({
      ...prevState,
      ratingAvg: newRatingAvg,
      reviewCount: newReviewCount,
    }));
  };

  useEffect(() => {
    const randomId = generateRandomProductId();
    setProductId(randomId);
    // setProductId(41126); // out of stock XS
    // setProductId(40344);
  }, []);

  useEffect(() => {
    const url = `${BASE_URL}${CAMPUS_CODE}/products/${productId}`;
    const fetchProductId = () => {
      axios
        .get(url, {
          headers: {
            Authorization: TOKEN,
          },
          params: {
            count: 1,
          },
        })
        .then((response) => {
          console.log('product id', response.data.id);
          setProductId(response.data.id);
          setProductData(response.data);
        })
        .catch((err) => console.error('error in context', err));
    };
    const fetchProductStyles = () => {
      axios
        .get(`${url}/styles`, {
          headers: {
            Authorization: TOKEN,
          },
        })
        .then((response) => {
          setProductStyles(response.data.results);
        })
        .catch((err) => console.error('error in context', err));
    };
    const getStarAndReviewCount = () => {
      axiosInstance.get('/reviews', {
        params: {
          page: 1,
          count: 5000,
          product_id: productId,
        },
      }).then((response) => {
        if (response.data?.results) {
          const totalStars = response.data.results.reduce((acc, review) => (review?.rating ? acc + review.rating : acc), 0);
          setStarCount(totalStars / (response.data.results.length));
          setReviewCount(response.data.results.length);
        }
      }).catch((err) => {
        console.log(err);
      });
    };

    if (productId) {
      fetchProductId();
      fetchProductStyles();
      getStarAndReviewCount();
    }
  }, [productId]);
  return (
    <ProductContext.Provider value={{
      productId, productData, productStyles, starCount, reviewCount, setProductId, newProduct, updateRRCount,
    }}
    >
      {children}

    </ProductContext.Provider>
  );
};

export default ProductContext;

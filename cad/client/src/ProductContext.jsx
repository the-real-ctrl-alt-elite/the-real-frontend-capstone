import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();
const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const { CAMPUS_CODE } = process.env;

export const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState();
  const [productStyles, setProductStyles] = useState();
  const [rrCount, setrrCount] = useState({ ratingAvg: '', reviewCount: '' });

  const generateRandomProductId = () => {
    return Math.floor(Math.random() * (41354 - 40344 + 1)) + 40344;
  };

  // const fetchProductId = () => {
  //   const randomId = generateRandomProductId();
  //   const url = `${BASE_URL}${CAMPUS_CODE}/products/${randomId}`;
  //   axios
  //     .get(url, {
  //       headers: {
  //         Authorization: TOKEN,
  //       },
  //       params: {
  //         count: 1,
  //       },
  //     })
  //     .then((response) => {
  //       console.log('context', response.data.id);
  //       setProductId(response.data.id);
  //       setProductData(response.data);
  //     })
  //     .catch((err) => console.error('error in context', err));
  // };
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

  // const fetchProductStyles = () => {
  //   if (productId) {
  //     const url = `${BASE_URL}${CAMPUS_CODE}/products/${productId}/styles`;
  //     axios
  //       .get(url, {
  //         headers: {
  //           Authorization: TOKEN,
  //         },
  //       })
  //       .then((response) => {
  //         setProductStyles(response.data);
  //       })
  //       .catch((err) => console.error('error in context', err));
  //   }
  // };

  useEffect(() => {
    const randomId = generateRandomProductId();
    const url = `${BASE_URL}${CAMPUS_CODE}/products/${randomId}`;
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
    fetchProductId();
    fetchProductStyles();
  }, []);

  return (
    <ProductContext.Provider value={{
      productId, productData, productStyles, setProductId, newProduct, updateRRCount,
    }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

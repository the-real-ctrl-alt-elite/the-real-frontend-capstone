import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from './AxiosInstance';

const ProductContext = createContext();
const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const { CAMPUS_CODE } = process.env;

export const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState(null);
  const [productData, setProduct] = useState({});
  const [productStyles, setProductStyles] = useState([]);
  const [starCount, setStarCount] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);

  const [sizeArray, setSizeArray] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [skus, setSkus] = useState({});
  const [item, setItem] = useState({});
  const [isSale, setIsSale] = useState(null);
  // State for sale items
  const [sale, setSale] = useState(null);
  const [saleId, setSaleId] = useState('');
  const [saleName, setSaleName] = useState('');
  const [money, setMoney] = useState({ dollar: '', cent: '' });


  const [imageTracker, setImageTracker] = useState({ original_url: '', style_url: '', style_photo: false });
  const [currentStyle, setCurrentStyle] = useState(
    {
      original_price: 0,
      sale_price: 0,
      percent_change: '',
      color: '',
      newColor: '',
      colorCheck: false,
      index: null,
      id: -1,
    },
  );
  const [shownStyle, setShownStyle] = useState('');
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

  const fetchSaleItem = () => {
    const randomId = generateRandomProductId();
    const url_name = `${BASE_URL}${CAMPUS_CODE}/products/${randomId}`;
    const url_price = `${url_name}/styles`;

    axios
      .get(url_price, {
        headers: { Authorization: TOKEN },
      })
      .then((response) => {
        const saleItem = response.data.results.find((item) => item.sale_price !== null);

        if (saleItem) {
          axios
            .get(url_name, {
              headers: { Authorization: TOKEN },
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
      .catch((err) => console.error('Error fetching sale item:', err));
  };
  const fetchProductId = () => {
    const url = `${BASE_URL}${CAMPUS_CODE}/products/${productId}`;
    axios
      .get(url, {
        headers: {
          Authorization: TOKEN
        },
        params: { count: 1 },
      })
      .then((response) => {
        axios
          .get(`${url}/styles`, {
            headers: {
              Authorization: TOKEN
            },
          })
          .then((response) => {
            const res = response.data.results;
            Object.values(res[0].skus).forEach((item) => setSizeArray((prevArray) => prevArray.concat(item.size)));
            setSelectedSize(Object.values(res[0].skus)[0].size);
            setSkus(res[0].skus);
            setProductStyles(res);
            res.map((item) => item['default?'] && setItem(item));
            res.map((item) => (item['default?'] & item.sale_price !== null) && setIsSale(true));
            setImageTracker((prev) => ({
              ...prev,
              original_url: res[0].photos[0].url,
              style_url: '',
              style_photo: false,
            }));
            const salePrice = res[0].sale_price;
            const percentChange = salePrice !== null
              ? (((+salePrice - +res[0].original_price) / +salePrice) * 100).toFixed(0) : null;
            setCurrentStyle((prev) => ({
              ...prev,
              original_price: res[0].original_price,
              sale_price: salePrice,
              percent_change: percentChange,
              color: res[0].name,
              index: 0,
              id: res[0].style_id,
            }));
            setShownStyle((prev) => ({
              ...prev,
              original_price: res[0].original_price,
              sale_price: salePrice,
              percent_change: percentChange,
              color: res[0].name,
              index: 0,
            }));
          })
          .catch((err) => console.error('error on contect', err));
        console.log('product id', response.data.id);
        setProductId(response.data.id);
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

  const getStarAndReviewCount = () => {
    axiosInstance
      .get('/reviews', {
        params: { page: 1, count: 5000, product_id: productId },
      })
      .then((response) => {
        if (response.data?.results) {
          const totalStars = response.data.results.reduce(
            (acc, review) => (review?.rating ? acc + review.rating : acc),
            0
          );
          setStarCount(totalStars / response.data.results.length);
          setReviewCount(response.data.results.length);
        }
      })
      .catch((err) => {
        console.log('error in axios get review count', err);
      });
  };
  useEffect(() => {
    if (productId) {
      fetchProductId();
      getStarAndReviewCount();
    }
    fetchSaleItem();
  }, [productId]);

  useEffect(() => {
    const randomId = generateRandomProductId();
    setProductId(randomId);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productId,
        productData,
        productStyles,
        starCount,
        reviewCount,
        sale,
        saleId,
        saleName,
        setProductId,
        newProduct,
        updateRRCount,
        sizeArray,
        selectedSize,
        setSelectedSize,
        skus,
        setSkus,
        item,
        isSale,
        imageTracker,
        setImageTracker,
        currentStyle,
        setCurrentStyle,
        shownStyle,
        setShownStyle,
        money,

      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

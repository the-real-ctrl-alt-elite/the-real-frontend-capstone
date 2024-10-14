import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Qa from './components/qa/Qa';
import Related from './components/relatedComparison/Related';
import Comparison from './components/relatedComparison/Comparison';
import Rating from './components/reviewRating/Rating';
import Selector from './components/styleSelect/Selector';

// example code do not uncomment in app
// import React, { useContext } from 'react'; // Imports to use the context
// import ProductContext from '../../ProductContext'; // this might need altering for your comp location


const App = () => {
  // example code do not uncomment in app
  // const { productId } = useContext(ProductContext); // this is how you access the id in your app

  return (
    <div className='app'>
      <Header />
      <Selector />
      <div className='related-comp-wrapper'>
        <Related />
        <Comparison />
      </div>
      <div
        id='Qa'
        className='qa-wrapper'
      >
        <Qa />
      </div>
      <div
        id='ratings'
        className='rating-review-wrapper'
      >
        <Rating />
      </div>
    </div>
  );
};

export default App;

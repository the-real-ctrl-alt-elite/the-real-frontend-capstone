import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Qa from './components/qa/Qa';
import Related from './components/relatedComparison/Related';
import Comparison from './components/relatedComparison/Comparison';
import Rating from './components/reviewRating/Rating';
import Selector from './components/styleSelect/Selector';


const App = () => {
  return (
    <div className='app'>
      <Header />
      <Selector />
      <div className='related-comp-wrapper'>
        <Related />
        <Comparison />
      </div>
      <div className='qa-wrapper'>
        <Qa />
      </div>
      <div className='rating-review-wrapper'>
        <Rating />
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Qa from './components/qa/Qa';
import RelatedSection from './components/relatedComparison/RelatedSection';
import OutfitSection from './components/relatedComparison/OutfitSection';
import Rating from './components/reviewRating/Rating';
import Selector from './components/styleSelect/Selector';

// example code do not uncomment in app
// import React, { useContext } from 'react'; // Imports to use the context
// import ProductContext from '../../ProductContext'; // this might need altering for your comp location

const App = () => {
  // example code do not uncomment in app
  // const { productId } = useContext(ProductContext); // this is how you access the id in your app
  const [pumpkins, setPumpkins] = useState(false);
  const [starAverage, setStarAverage] = useState(0);

  return (
    <div className='app'>
      <Header pumpkins={pumpkins} setPumpkins={setPumpkins} />
      <div className='innerApp'>
        <Selector starAverage={starAverage} pumpkins={pumpkins}/>
        <hr className='section-break' />
        <div className='related-comp-wrapper'>
          <RelatedSection />
          <OutfitSection />
        </div>
        <hr className='section-break' />
        <div
          id='Qa'
          className='qa-wrapper'
        >
          <Qa />
        </div>
        <hr className='section-break' />
        <div
          id='ratings'
          className='rating-review-wrapper'
        >
          <Rating pumpkins={pumpkins} setPumpkins={setPumpkins} setStarAverage={setStarAverage} />
        </div>
      </div>
    </div>
  );
};

export default App;

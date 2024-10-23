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

  return (
    <div className='app'>
      <Header pumpkins={pumpkins} setPumpkins={setPumpkins} />
      <div className='innerApp'>
        <Selector />
        <hr className='section-break' />
        <div className='related-comp-wrapper'>
          <RelatedSection />
          <OutfitSection />
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
          <Rating pumpkins={pumpkins} setPumpkins={setPumpkins} />
        </div>
      </div>
    </div>
  );
};

export default App;

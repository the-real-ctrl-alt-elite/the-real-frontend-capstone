import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Qa from './components/qa/Qa';
import RelatedSection from './components/relatedComparison/RelatedSection';
import OutfitSection from './components/relatedComparison/OutfitSection';
import Rating from './components/reviewRating/Rating';
import Selector from './components/styleSelect/Selector';

const App = () => {
  const [pumpkins, setPumpkins] = useState(false);
  const [starAverage, setStarAverage] = useState(0);
  const [cubeOpen, setCubeOpen] = useState(false);

  const toggleCube = () => {
    setCubeOpen(!cubeOpen);
  };

  return (
    <div className='app'>
      <Header pumpkins={pumpkins} setPumpkins={setPumpkins} />
      <div className='innerApp'>
        <Selector starAverage={starAverage} pumpkins={pumpkins} />
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
      <footer className='app-footer'>
        <p className='footer-copyright'>&copy; 2024 CTRL ALT Elite - FEC</p>
        <div
          className="scene"
          onClick={toggleCube}
          style={{
            height: cubeOpen && '1.2em',
            perspective: cubeOpen && 'none',
            marginRight: cubeOpen && '4px',
          }}
        >
          <div
            className='cube'
            style={{
              animation: cubeOpen && 'none'
            }}
          >
            <div
              className="cube-side cube-front"
              style={{
                right: cubeOpen && '260%',
                fontSize: cubeOpen && '18px',
                boxShadow: !cubeOpen && '0 0 1.5em 2px rgba(255, 255, 255, 0.0)',
                borderRadius: !cubeOpen && '5px'
              }}>Emma</div>
            <div
              className="cube-side cube-right "
              style={{
                right: cubeOpen && '175%',
                fontSize: cubeOpen && '18px',
                boxShadow: !cubeOpen && '0 0 1.5em 2px rgba(255, 255, 255, 0.0)',
                transform: cubeOpen && 'rotateY(0deg)translateZ(4em)',
                borderRadius: !cubeOpen && '5px'
              }}
            >Jeramy</div>
            <div
              className="cube-side cube-back "
              style={{
                right: cubeOpen && '90%',
                fontSize: cubeOpen && '18px',
                boxShadow: !cubeOpen && '0 0 1.5em 2px rgba(255, 255, 255, 0.0)',
                transform: cubeOpen && 'rotateY(0deg)translateZ(4em)',
                borderRadius: !cubeOpen && '5px'
              }}
            >Robert</div>
            <div
              className="cube-side cube-left"
              style={{
                right: cubeOpen && '5%',
                fontSize: cubeOpen && '18px',
                boxShadow: !cubeOpen && '0 0 1.5em 2px rgba(255, 255, 255, 0.0)',
                transform: cubeOpen && 'rotateY(0deg)translateZ(4em)',
                borderRadius: !cubeOpen && '5px'
              }}
            >Skyla</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';

const ProductBreakdown = ({ metaData }) => {
  const [characteristics, setCharacteristics] = useState([]);

  useEffect(() => {
    if (metaData.characteristics) {
      const keys = Object.keys(metaData.characteristics);
      const values = Object.values(metaData.characteristics);
      const positions = [];
      values.forEach((val) => {
        const percentage = (Number(val.value) / 5) * 100;
        positions.push(percentage);
      });
      setCharacteristics([keys, values, positions]);
    }
  }, [metaData.characteristics]);

  const sizeValues = ['Too Small', 'Perfect', 'Too Big'];
  const widthValues = ['Too Narrow', 'Perfect', 'Too Wide'];
  const comfortValues = ['Poor', 'Average', 'Great'];
  const qualityValues = ['Poor', 'Average', 'Great'];
  const lengthValues = ['Too Short', 'Perfect', 'Too Long'];
  const fitValues = ['Poor', 'Average', 'Perfect'];

  return (
    <div>
      {characteristics.length
        && characteristics[1].map((characteristic, index) => (
          <div
            className='productBreakdownBlock'
            key={characteristic.id}
          >
            <small
              style={{ textAlign: 'start' }}
            >
              {characteristics[0][index]}
            </small>
            <div
              className='productBreakdownRow'
              style={{ position: 'relative' }}
            >
              <div
                className='productBreakdownThird'
              />
              <div
                className='productBreakdownThird'
              />
              <div
                className='productBreakdownThird'
              />
              <i
                className='fa-solid fa-triangle fa-rotate-180 ratingTriangle'
                style={{ position: 'absolute', left: `calc(${characteristics[2][index]}% - 5.5px)` }}
              />
            </div>
            <div
              className='productBreakdownRow'
            >
              {characteristics[0][index] === 'Size'
                && sizeValues.map((size) => (
                  <small key={size}>{size}</small>
                ))}
              {characteristics[0][index] === 'Width'
                && widthValues.map((width) => (
                  <small key={width}>{width}</small>
                ))}
              {characteristics[0][index] === 'Comfort'
                && comfortValues.map((comfort) => (
                  <small key={comfort}>{comfort}</small>
                ))}
              {characteristics[0][index] === 'Quality'
                && qualityValues.map((quality) => (
                  <small key={quality}>{quality}</small>
                ))}
              {characteristics[0][index] === 'Length'
                && lengthValues.map((length) => (
                  <small key={length}>{length}</small>
                ))}
              {characteristics[0][index] === 'Fit'
                && fitValues.map((fit) => (
                  <small key={fit}>{fit}</small>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductBreakdown;

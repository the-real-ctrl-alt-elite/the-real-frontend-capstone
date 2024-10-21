import React, { useEffect, useState } from 'react';
import ReviewSectionFooter from './ReviewSectionFooter';

const UserCharacteristics = ({
  characteristics,
  characteristicVotes,
  setCharacteristicVotes,
  reviewStep,
  backStep,
  nextStep,
}) => {
  const [characteristicStep, setCharacteristicStep] = useState(0);
  const [votingDone, setVotingDone] = useState(false);

  const [sizeState, setSizeState] = useState(null);
  const [widthState, setWidthState] = useState(null);
  const [comfortState, setComfortState] = useState(null);
  const [qualityState, setQualityState] = useState(null);
  const [lengthState, setLengthState] = useState(null);
  const [fitState, setFitState] = useState(null);

  const categoryVotes = {
    Size: [
      'A size too small',
      '1/2 a size too small',
      'Perfect!',
      '1/2 size too big',
      'A size too big',
    ],
    Width: [
      'Too narrow',
      'Slightly narrow',
      'Perfect!',
      'Slightly wide',
      'Too wide',
    ],
    Comfort: [
      'Uncomfortable',
      'Slightly uncomfortable',
      'Okay',
      'Comfortable',
      'Perfect!',
    ],
    Quality: [
      'Poor',
      'Below Average',
      'What I Expected',
      'Pretty great',
      'Perfect!',
    ],
    Length: [
      'Runs short',
      'Runs slightly short',
      'Perfect!',
      'Runs slightly long',
      'Runs long',
    ],
    Fit: [
      'Runs tight',
      'Runs slightly tight',
      'Perfect!',
      'Runs slightly loose',
      'Runs loose',
    ],
  };

  const checkDefaultValue = (category, index) => {
    switch (category) {
      case 'Size':
        if (sizeState === index) {
          return true;
        }
        return false;
      case 'Width':
        if (widthState === index) {
          return true;
        }
        return false;
      case 'Comfort':
        if (comfortState === index) {
          return true;
        }
        return false;
      case 'Quality':
        if (qualityState === index) {
          return true;
        }
        return false;
      case 'Length':
        if (lengthState === index) {
          return true;
        }
        return false;
      case 'Fit':
        if (fitState === index) {
          return true;
        }
        return false;
      default:
        return false;
    }
  };

  const handleRadioChange = (category, index) => {
    switch (category) {
      case 'Size':
        setSizeState(index);
        break;
      case 'Width':
        setWidthState(index);
        break;
      case 'Comfort':
        setComfortState(index);
        break;
      case 'Quality':
        setQualityState(index);
        break;
      case 'Length':
        setLengthState(index);
        break;
      case 'Fit':
        setFitState(index);
        break;
      default:
        break;
    }
  };

  const checkCharStatus = (item) => {
    if (item === 'Size') {
      return sizeState;
    }
    if (item === 'Width') {
      return widthState;
    }
    if (item === 'Comfort') {
      return comfortState;
    }
    if (item === 'Quality') {
      return qualityState;
    }
    if (item === 'Length') {
      return lengthState;
    }
    if (item === 'Fit') {
      return fitState;
    }
    return null;
  };

  const findNearestNull = (index) => {
    const temp = characteristicVotes.slice();
    temp[index] = true;
    setCharacteristicVotes(temp);
    const i = temp.indexOf(null);
    if (i === -1) {
      return;
    }
    setCharacteristicStep(i);
  };

  useEffect(() => {
    const validateRadios = () => {
      const truthTest = [];
      characteristics.forEach((item) => {
        if (item === 'Size') {
          truthTest.push(sizeState);
        }
        if (item === 'Width') {
          truthTest.push(widthState);
        }
        if (item === 'Comfort') {
          truthTest.push(comfortState);
        }
        if (item === 'Quality') {
          truthTest.push(qualityState);
        }
        if (item === 'Length') {
          truthTest.push(lengthState);
        }
        if (item === 'Fit') {
          truthTest.push(fitState);
        }
      });
      if (truthTest.every((item) => item !== null)) {
        setVotingDone(true);
      } else {
        setVotingDone(false);
      }
    };
    validateRadios();
  }, [sizeState, widthState, comfortState, qualityState, lengthState, fitState, characteristics]);
  //
  return (
    <div className={reviewStep === 2 ? 'add-review-section active' : 'add-review-section'}>
      <div className='neat-line' />
      <div className='add-review-section-row'>
        <div className='add-review-section-header'>
          <h4 className='add-review-section-bubble'>
            3
          </h4>
          <h4 className='add-review-section-title'>
            Characteristics
          </h4>
          <div className='add-review-section-status'>
            <i className={votingDone ? 'fa-regular fa-check reviewIcon' : 'fa-regular fa-x reviewIcon'} />
          </div>
        </div>
      </div>
      {reviewStep === 2
      && (
      <div className='add-review-section-content'>
        <h4>How Would You Rate These Product Characteristics?</h4>
        {reviewStep === 2 && characteristics.map((category, i) => (
          <div
            key={category}
            className={characteristicStep === i && 'charStepActive'}
          >
            <div
              className='characteristicHeader'
              onMouseEnter={() => { setCharacteristicStep(i); }}
            >
              <i className={checkCharStatus(category) !== null ? 'fa-regular fa-check inputChecks' : 'fa-regular fa-x inputChecks'} />
              <h5>{category}</h5>
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'space-around' }}
            >
              {characteristicStep === i
              && categoryVotes[category].map((choice, index) => (
                <div className='characteristicVoteBox'>
                  <label
                    htmlFor={choice}
                    style={{
                      display: 'flex', flexDirection: 'column', textAlign: 'center',
                    }}
                  >
                    <small>{choice}</small>
                    <input
                      type='radio'
                      id={choice}
                      name={category}
                      value={index}
                      checked={checkDefaultValue(category, index)}
                      onChange={() => {
                        handleRadioChange(category, index);
                        findNearestNull(characteristicStep);
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <ReviewSectionFooter
          backFlag
          backText='Previous Step'
          backFn={backStep}
          nextFlag={votingDone}
          nextText='Next Step'
          nextFn={nextStep}
        />
      </div>
      )}
    </div>
  );
};

export default UserCharacteristics;

import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import QuestionsList from './QuestionsList';
import MoreQuestions from './MoreQuestions';



const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;

console.log('baseURL: ', BASE_URL, ' ', TOKEN, ' ', CAMPUS_CODE);
const Qa = () => {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions';
  const [qnaData, setQnaData] = useState({});
  console.log('url is: ', url);
  axios
    .get(url, {
      headers: {
        Authorization: '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',
      },
      params: {
        product_id: 40345,
      },
    })
    .then((result) => console.log('result of axios get: ', result))
    .catch((err) => console.log('error getting the full QNA: ', err));

  const qNaData = {
    product_id: '5',
    results: [{
      question_id: 37,
      question_body: 'Why is this product cheaper here than other sites?',
      question_date: '2018-10-18T00:00:00.000Z',
      asker_name: 'williamsmith',
      question_helpfulness: 4,
      reported: false,
      answers: {
        68: {
          id: 68,
          body: 'We are selling it here without any markup from the middleman!',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'Seller',
          helpfulness: 4,
          photos: ['jpg', 'jpg', 'jpg'],
        },
        99: {
          id: 99,
          body: 'FakeSeller should be after seller even though FakeSeller is rated higher',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'FakeSeller',
          helpfulness: 6,
          photos: ['jpg', 'jpg', 'jpg'],
        },
      },
    },
    {
      question_id: 18,
      question_body: 'What is the French word for cheese?',
      question_date: '2018-10-18T00:00:00.000Z',
      asker_name: 'cheeselover',
      question_helpfulness: 3,
      reported: false,
      answers: {
        61: {
          id: 61,
          body: 'Fromage!',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'cheeescake',
          helpfulness: 4,
          photos: [],
        },
      },
    },
    {
      question_id: 107,
      question_body: 'What is the national dish of England?',
      question_date: '2019-10-18T00:00:00.000Z',
      asker_name: 'curisbird',
      question_helpfulness: 8,
      reported: false,
      answers: {
        1: {
          id: 1,
          body: 'instant noodles',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'Seller',
          helpfulness: 2,
          photos: ['jpg'],
        },
        2: {
          id: 2,
          body: 'pizza',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'pizzaLover',
          helpfulness: 4,
          photos: [],
        },
        3: {
          id: 3,
          body: 'rice',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'SpecialRicer',
          helpfulness: 6,
          photos: ['jpg'],
        },
        4: {
          id: 4,
          body: 'Chicken Tikka Masala',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'theTruth',
          helpfulness: 10,
          photos: ['jpg'],
        },
        5: {
          id: 5,
          body: 'Masala',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'theTruth',
          helpfulness: 8,
          photos: ['jpg'],
        },
        6: {
          id: 6,
          body: 'chicken',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'theTruth',
          helpfulness: 7,
          photos: ['jpg'],
        },
        7: {
          id: 7,
          body: 'chicken2',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'theTruth',
          helpfulness: 6,
          photos: ['jpg'],
        },
        8: {
          id: 8,
          body: 'chicken8',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'theTruth',
          helpfulness: 4,
          photos: ['jpg'],
        },
        9: {
          id: 9,
          body: 'chicken9',
          date: '2018-08-18T00:00:00.000Z',
          answerer_name: 'theTruth',
          helpfulness: 2,
          photos: ['jpg'],
        },
      },
    },
    {
      question_id: 50,
      question_body: 'What do you call a baby owl?',
      question_date: '2010-10-18T00:00:00.000Z',
      asker_name: 'sombodyFake',
      question_helpfulness: 3,
      reported: false,
      answers: {
        10: {
          id: 10,
          body: 'I dont know?',
          date: '2010-10-19T00:00:00.000Z',
          answerer_name: 'SombodyFaker',
          helpfulness: 4,
          photos: ['jpg', 'jpg', 'jpg'],
        },
        11: {
          id: 11,
          body: 'An outlet',
          date: '2010-10-19T00:00:00.000Z',
          answerer_name: 'kindoffake',
          helpfulness: 5,
          photos: [],
        },
        12: {
          id: 12,
          body: 'An owlet',
          date: '2010-10-19T00:00:00.000Z',
          answerer_name: 'thetrueanswerer',
          helpfulness: 10,
          photos: ['jpg', 'jpg', 'jpg'],
        },
      },
    },
    {
      question_id: 38,
      question_body: 'How long does it last?',
      question_date: '2019-06-28T00:00:00.000Z',
      asker_name: 'funnygirl',
      question_helpfulness: 2,
      reported: false,
      answers: {
        70: {
          id: 70,
          body: 'Some of the seams started splitting the first time I wore it!',
          date: '2019-11-28T00:00:00.000Z',
          answerer_name: 'sillyguy',
          helpfulness: 6,
          photos: [],
        },
        78: {
          id: 78,
          body: '9 lives',
          date: '2019-11-12T00:00:00.000Z',
          answerer_name: 'iluvdogz',
          helpfulness: 31,
          photos: [],
        },
      },
    }],
  };

  const fullList = qNaData.results;
  fullList.sort((a, b) => b.question_helpfulness - a.question_helpfulness);

  const [qnas, setQnas] = useState(fullList.slice(0, 4));
  const [moreQuestions, setMoreQuestions] = useState(false);
  const handleClickMoreQuestion = () => {
    setQnas(fullList);
    if (!moreQuestions) {
      setMoreQuestions(true);
    }
  };

  const [search, setSearch] = useState('');
  const handleOnChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 3) {
      const searchList = qnas.filter((qna) => {
        return qna.question_body.includes(search);
      });
      setQnas(searchList);
    } else if (!moreQuestions) {
      setQnas(fullList.slice(0, 4));
    } else {
      setQnas(fullList);
    }
    console.log('search value: ', e.target.value);
  };

  return (
    <div className='qa-container'>
      <h3>QUESTIONS & ANSWERS</h3>
      <input className='search-bar' placeholder='Have a questions? Search for answers...' onChange={handleOnChange}></input>
      <div>{qnas.length !== 0 && <QuestionsList qnas={qnas} />}</div>
      <button type='button' onClick={handleClickMoreQuestion}>{qnas.length !== 0 && <MoreQuestions />}</button>
      <button type='button'>Add A Question</button>
    </div>
  );
};

export default Qa;

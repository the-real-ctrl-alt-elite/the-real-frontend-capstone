import React, { useState, useEffect } from 'react';
import QuestionsList from './QuestionsList';
import MoreQuestions from './MoreQuestions';

const Qa = () => {
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

  const qnas = qNaData.results.slice(0, 4);
  qnas.sort((a, b) => b.question_helpfulness - a.question_helpfulness);

  return (
    <div className='qa-container'>
      QUESTIONS & ANSWERS
      <div>
        <QuestionsList qnas={qnas} />
      </div>
      <MoreQuestions />
    </div>
  );
};

export default Qa;

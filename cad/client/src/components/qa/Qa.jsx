import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import QuestionsList from './QuestionsList';
import MoreQuestions from './MoreQuestions';
import AddAQuestionModal from './AddAQuestionModal';
import AddAnAnswerModal from './AddAnAnswerModal';
import ProductContext from '../../ProductContext';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS = process.env.CAMPUS_CODE;

const Qa = () => {
  const [qNaData, setQnaData] = useState({});
  const [fullList, setFullList] = useState([]);
  const [qnas, setQnas] = useState([]);
  const { productId, productData } = useContext(ProductContext);
  console.log('productID from context', productId);

  const [productName, setProductName] = useState('');
  // if (productId && ) {
  //   setProductName(productData.name);
  // }
  useEffect(() => {
    if (productData && productId) {
      setProductName(productData.name);
    }
  }, [productData, productId]);
  useEffect(() => {
    if (productId) {
      axios
        .get(`${BASE_URL}${CAMPUS}/qa/questions`, {
          headers: {
            Authorization: TOKEN,
          },
          params: {
            product_id: productId,
          },
        })
        .then((result) => {
          if (result) {
            setQnaData(result.data);
            setFullList(result.data.results.sort((a, b) => b.question_helpfulness - a.question_helpfulness));
          }
        })
        .catch((err) => console.log('error getting the full QNA: ', err));
    } else {
      console.log('waiting for productId to be set');
    }
  }, [productId]);

  useEffect(() => {
    if (fullList.length > 0) {
      setQnas(fullList.slice(0, 2));
    }
  }, [fullList]);

  const OldqNaData = {
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
    },
    {
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
    }],
  };

  const [moreQuestions, setMoreQuestions] = useState(2);
  const handleClickMoreQuestion = () => {
    setQnas(fullList.slice(0, moreQuestions + 2));
    if (moreQuestions < fullList.length + 2) {
      setMoreQuestions(moreQuestions + 2);
    }
  };

  const [search, setSearch] = useState('');
  const handleOnChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 3) {
      const searchList = qnas.filter((qna) => {
        return qna.question_body.toLowerCase().includes(search.toLowerCase());
      });
      setQnas(searchList);
    } else {
      setQnas(fullList.slice(0, moreQuestions));
    }
  };

  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const handleAddAQuestion = () => {
    setOpenQuestionModal(true);
  };

  const [openAnswerModal, setOpenAnswerModal] = useState(false);

  return (
    <div className='qa-container'>
      {openQuestionModal && <AddAQuestionModal setOpenQuestionModal={setOpenQuestionModal} productName={productName} productId={productId} />}

      <h3 className='section-title'>QUESTIONS & ANSWERS</h3>
      <input className='search-bar' placeholder='Have a questions? Search for answers...' onChange={handleOnChange} />
      <div className='questions-list' data-testid='QuestionsList'>{qnas.length > 0 && <QuestionsList qnas={qnas} setOpenAnswerModal={setOpenAnswerModal} />}</div>
      <span onClick={handleClickMoreQuestion}>{fullList.length > 2 && fullList.length !== qnas.length && <MoreQuestions />}</span>
      <span><button type='button' onClick={handleAddAQuestion}>Add A Question</button></span>
      {openAnswerModal && <AddAnAnswerModal setOpenAnswerModal={setOpenAnswerModal} />}

    </div>
  );
};

export default Qa;

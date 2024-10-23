import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import QuestionsList from './QuestionsList';
import MoreQuestions from './MoreQuestions';
import AddAQuestionModal from './AddAQuestionModal';
import ProductContext from '../../ProductContext';
import ModalBackground from '../reviewRating/components/ModalBackground';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS = process.env.CAMPUS_CODE;

const Qa = () => {
  const [qNaData, setQnaData] = useState({});
  const [fullList, setFullList] = useState([]);
  const [qnas, setQnas] = useState([]);
  const { productId, productData } = useContext(ProductContext);
  // console.log('productID from context', productId);

  const [productName, setProductName] = useState('');

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
    }
  }, [productId]);

  useEffect(() => {
    if (fullList.length > 0) {
      setQnas(fullList.slice(0, 2));
    }
  }, [fullList]);

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
      {openQuestionModal && <ModalBackground component={AddAQuestionModal} componentProps={{ setOpenQuestionModal, productName, productId }} top={0} closeModal={() => setOpenQuestionModal(false)} backgroundClose={false} />}

      <h3 className='section-title'>QUESTIONS & ANSWERS</h3>
      <input className='search-bar' placeholder='Have questions? Search for answers...' onChange={handleOnChange} />
      <div className='questions-list' data-testid='QuestionsList'>{qnas.length > 0 && <QuestionsList qnas={qnas} setOpenAnswerModal={setOpenAnswerModal} openAnswerModal={openAnswerModal} productName={productName} />}</div>
      <div className='qnaFnBtnBox'>
        <span onClick={handleClickMoreQuestion}>{fullList.length > 2 && fullList.length !== qnas.length && <MoreQuestions />}</span>
        <span><button className='qnaFnBtn' type='button' onClick={handleAddAQuestion}>ADD A QUESTION</button></span>
      </div>

    </div>
  );
};

export default Qa;

// <AddAQuestionModal setOpenQuestionModal={setOpenQuestionModal} productName={productName} productId={productId}

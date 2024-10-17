import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Photoes from './Photoes';
import Footer from './Footer';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS = process.env.CAMPUS_CODE;

const Answers = ({ questionId }) => {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios
      .get(`${BASE_URL}${CAMPUS}/qa/questions/${questionId}/answers`, {
        headers: {
          Authorization: TOKEN,
        },
        params: {
          page: 1,
          count: 5,
        },
      })
      .then((result) => {
        setAnswers(result.data.results);
      })
      .catch((err) => console.log('failed to get non-reported answers: ', err));
  }, [questionId]);

  const allAnswers = Object.values(answers);
  allAnswers.sort((a, b) => b.helpfulness - a.helpfulness);
  const sellerAnswer = allAnswers.find((answer) => answer.answerer_name === 'Seller');
  let newAllAnswers = [];
  if (sellerAnswer !== undefined) {
    newAllAnswers = allAnswers.filter((answer) => answer.answerer_name !== 'Seller');
    newAllAnswers.unshift(sellerAnswer);
  } else {
    newAllAnswers = allAnswers;
  }
  const topAnswers = newAllAnswers.slice(0, 2);
  const [answerList, setAnswerList] = React.useState(topAnswers);
  useEffect(() => {
    if (topAnswers.length === 2 && answerList.length === 0) {
      setAnswerList(topAnswers);
    }
  }, [topAnswers, answerList]);

  const [extend, setExtend] = React.useState(false);
  const handleClickMoreAnswers = () => {
    if (!extend) {
      setAnswerList(newAllAnswers);
      setExtend(!extend);
      const reminder = document.getElementById('scrollReminder');
      reminder.style.display = 'block';
      setTimeout(() => {
        reminder.style.display = 'none';
      }, 2000);
    } else {
      setAnswerList(topAnswers);
      setExtend(!extend);
    }
  };
  console.log('check answerList to look for answer id: ', answerList);
  return (
    <div className={`load-more-answers ${extend ? 'full-answers' : ''}`}>
      {answerList.map((answer, idx) => {
        return (
          <div className='answer-section'>
            <span className='answer-header'>A: </span>
            <span>{answer.body}</span>
            <div>{answer.photos.length > 0 && <Photoes photos={answer.photos} />}</div>
            <Footer userName={answer.answerer_name} dateData={answer.date} helpfulness={answer.helpfulness} answerList={answerList} setAnswerList={setAnswerList} idx={idx} answerId={answer.answer_id} />
          </div>
        );
      })}
      {allAnswers.length > 2 && (
      <div id='scrollReminder' className='popup'>
        <p>scroll down to view all answers!</p>
      </div>
      )}
      <div>{allAnswers.length > 2 && <span onClick={handleClickMoreAnswers}>{extend ? 'COLLAPSE ANSWERS' : 'LOAD MORE ANSWERS'}</span>}</div>
    </div>
  );
};

export default Answers;

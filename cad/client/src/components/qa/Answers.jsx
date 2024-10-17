import React from 'react';
import Photoes from './Photoes';
import Footer from './Footer';

const Answers = ({ answers }) => {
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
  const [extend, setExtend] = React.useState(false);
  const handleClickMoreAnswers = () => {
    if (!extend) {
      setAnswerList(newAllAnswers);
      setExtend(!extend);
    } else {
      setAnswerList(topAnswers);
      setExtend(!extend);
    }
  };

  return (
    <div className={`load-more-answers ${extend ? 'full-answers' : ''}`}>
      {answerList.map((answer, idx) => {
        return (
          <div className='answer-section'>
            <span className='answer-header'>A: </span>
            <span>{answer.body}</span>
            <div>{answer.photos.length > 0 && <Photoes photos={answer.photos} />}</div>
            <Footer userName={answer.answerer_name} dateData={answer.date} helpfulness={answer.helpfulness} answerList={answerList} setAnswerList={setAnswerList} idx={idx} />
          </div>
        );
      })}
      <div>{allAnswers.length > 2 && <span onClick={handleClickMoreAnswers}>{extend ? 'COLLAPSE ANSWERS' : 'LOAD MORE ANSWERS'}</span>}</div>
    </div>
  );
};

export default Answers;

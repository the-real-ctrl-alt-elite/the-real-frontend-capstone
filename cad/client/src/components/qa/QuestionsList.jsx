import React, { useState } from 'react';
import Answers from './Answers';
import Question from './Question';

const QuestionsList = ({ qnas, setOpenAnswerModal }) => {
  return (
    <div>
      { qnas.map((qna, idx) => {
        return (
          <div key={idx}>
            <div className='question-title'><Question qna={qna} setOpenAnswerModal={setOpenAnswerModal} /></div>
            <div><Answers answers={qna.answers} /></div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsList;

import React, { useState } from 'react';
import Answers from './Answers';
import Question from './Question';

const QuestionsList = ({ qnas, setOpenAnswerModal }) => {
  return (
    <div>
      { qnas.map((qna, idx) => {
        return (
          <div key={idx}>
            <div className='question-title'><Question qna={qna} setOpenAnswerModal={setOpenAnswerModal} questionId={qna.question_id} /></div>
            <div><Answers questionId={qna.question_id} /></div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsList;

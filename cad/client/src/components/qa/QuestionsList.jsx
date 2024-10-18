import React, { useState } from 'react';
import Answers from './Answers';
import Question from './Question';
import AddAnAnswerModal from './AddAnAnswerModal';

const QuestionsList = ({
  qnas, setOpenAnswerModal, openAnswerModal, productName,
}) => {
  return (
    <div>
      { qnas.map((qna, idx) => {
        return (
          <div key={idx}>
            <div className='question-title'><Question qna={qna} setOpenAnswerModal={setOpenAnswerModal} questionId={qna.question_id} /></div>
            <div><Answers questionId={qna.question_id} /></div>
            {openAnswerModal && <AddAnAnswerModal setOpenAnswerModal={setOpenAnswerModal} questionName={qna.question_body} productName={productName} />}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsList;

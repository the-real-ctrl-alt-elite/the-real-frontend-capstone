import React, { useState } from 'react';
import Answers from './Answers';
import Question from './Question';
import AddAnAnswerModal from './AddAnAnswerModal';
import ModalBackground from '../reviewRating/components/ModalBackground';

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
            {openAnswerModal && (
            <ModalBackground
              component={AddAnAnswerModal}
              componentProps={{
                setOpenAnswerModal, questionName: qna.question_body, productName, questionId: qna.question_id,
              }}
              backgroundClose={false}
              closeModal={() => setOpenAnswerModal(false)}
            />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsList;

// AddAnAnswerModal setOpenAnswerModal={setOpenAnswerModal} questionName={qna.question_body} productName={productName} questionId={qna.question_id}

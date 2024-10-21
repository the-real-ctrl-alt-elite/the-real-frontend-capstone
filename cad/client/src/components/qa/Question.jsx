import React from 'react';
import axios from 'axios';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS = process.env.CAMPUS_CODE;

const Question = ({ qna, setOpenAnswerModal, questionId }) => {

  const URL = `${BASE_URL}${CAMPUS}/qa/questions/${questionId}/helpful`;
  const [helpfulPoint, setHelpfulPoint] = React.useState(qna.question_helpfulness);
  const [clickStatus, setClickStatus] = React.useState(false);
  const handleClickYes = () => {
    if (!clickStatus) {
      setHelpfulPoint(helpfulPoint + 1);
      setClickStatus(true);
      axios
        .put(URL, null, {
          headers: {
            Authorization: TOKEN,
          },
        })
        .then((result) => console.log('sucessfully updated helpfulness for question: ', result))
        .catch((err) => console.log('failed to update helpfulness for question', err));
    }
  };
  const handleAddAnAnswer = () => {
    setOpenAnswerModal(true);
  };
  return (
    <div>
      <div className='question-body'>
        Q:
        {qna.question_body}
      </div>
      <div className='question-property'>
        <span className='question-note'>Helpful?</span>
        <a href='#/' onClick={handleClickYes}>Yes</a>
        (
        {helpfulPoint}
        )
        <span className='question-note'>|</span>
        <a href='#/' onClick={handleAddAnAnswer}>Add Answer</a>
      </div>
    </div>
  );
};

export default Question;

import React from 'react';
import axios from 'axios';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS = process.env.CAMPUS_CODE;

const Question = ({ qna, setOpenAnswerModal, questionId }) => {
  // console.log('question id for changing helpfulness for question: ', questionId);
  const URL = `${BASE_URL}${CAMPUS}/qa/questions/${questionId}/helpful`;
  // console.log('put request url: ', URL);
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
        .then(() => console.log('sucessfully updated helpfulness for question'))
        .catch((err) => console.log('failed to update helpfulness for question', err));
    }
  };
  const handleAddAnAnswer = () => {
    setOpenAnswerModal(true);
  };
  return (
    <div>
      <span className='question-body'>
        Q:
        {qna.question_body}
      </span>
      <span>
        Helpful?
        <a href='#/' onClick={handleClickYes}>Yes</a>
        (
        {helpfulPoint}
        ) |
        <a href='#/' onClick={handleAddAnAnswer}>Add Answer</a>
      </span>
    </div>
  );
};

export default Question;

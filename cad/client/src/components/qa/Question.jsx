import React from 'react';

const Question = ({ qna }) => {
  const [helpfulPoint, setHelpfulPoint] = React.useState(qna.question_helpfulness);
  const [clickStatus, setClickStatus] = React.useState(false);
  const handleClickYes = () => {
    if (!clickStatus) {
      setHelpfulPoint(helpfulPoint + 1);
      setClickStatus(true);
    }
  };
  return (
    <div>
      <span className='question-body'>Q: {qna.question_body}</span>
      <span> Helpful? <a href="#/" onClick={handleClickYes}>Yes</a> ({helpfulPoint}) | <a href="#/">Add Answer</a></span>
    </div>
  );
};

export default Question;

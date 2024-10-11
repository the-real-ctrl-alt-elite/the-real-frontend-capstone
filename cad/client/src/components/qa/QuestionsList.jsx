import React from 'react';
import Answers from './Answers';

const QuestionsList = ({ qnas }) => {
  return (
    <div>
      {qnas.map((qna, idx) => {
        const keysForAnswers = Object.keys(qna.answers);
        const topAnswers = [];
        topAnswers.push(qna.answers[keysForAnswers[0]]);
        if (keysForAnswers.length > 1) {
          topAnswers.push(qna.answers[keysForAnswers[1]]);
        }
        return (
          <div key={idx}>
            <h3>Q: {qna.question_body}
              <small> Helpful? <a href="#">Yes</a> ({qna.question_helpfulness}) | <a href="#">Add Answer</a></small>
            </h3>
            <p><Answers answers={topAnswers} /></p>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsList;

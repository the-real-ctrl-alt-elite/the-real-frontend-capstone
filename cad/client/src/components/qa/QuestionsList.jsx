import React, { useState } from 'react';
import Answers from './Answers';
import Question from './Question';

const QuestionsList = ({ qnas }) => {
  return (
    <div>
      { qnas.map((qna, idx) => {
        // const keysForAnswers = Object.keys(qna.answers);
        // console.log('keys for answers: ', keysForAnswers);
        // const answerList = [];
        // keysForAnswers.forEach((key) => answerList.push(qna.answers[key]));
        // // answerList.push(qna.answers[keysForAnswers[0]]);
        // // if (keysForAnswers.length > 1) {
        // //   answerList.push(qna.answers[keysForAnswers[1]]);
        // // }
        // answerList.sort((a, b) => b.helpfulness - a.helpfulness);
        // const topAnswers = answerList.slice(0, 2);
        // const [displayAnswers, setDisplayAnswers] = useState(topAnswers);


        return (
          <div key={idx}>
            <div><Question qna={qna} /></div>
            <div><Answers answers={qna.answers} /></div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsList;

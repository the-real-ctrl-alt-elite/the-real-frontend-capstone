import React from 'react';
import Photoes from './Photoes';
import Footer from './Footer';

const Answers = ({ answers }) => {
  const allAnswers = Object.values(answers);
  allAnswers.sort((a, b) => b.helpfulness - a.helpfulness);
  const topAnswers = allAnswers.slice(0, 2);

  return (
    <div>
      {
        topAnswers.map((answer) => {
          return <div key={answer.id}>
            <p>{`A: ${answer.body}`}</p>
            <div>
              {
                answer.photos.length > 0 && <Photoes photos={answer.photos} />
              }
            </div>
            <Footer userName={answer.answerer_name} dateData={answer.date} helpfulness={answer.helpfulness} />
          </div>
        })
      }
    </div>
  );
};

export default Answers;

import React from 'react';
import { format } from 'date-fns';
import axios from 'axios';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS = process.env.CAMPUS_CODE;

const Footer = ({
  userName, dateData, helpfulness, answerList, setAnswerList, idx, answerId,
}) => {
  const helpfulURL = `${BASE_URL}${CAMPUS}/qa/answers/${answerId}/helpful`;
  const reportURL = `${BASE_URL}${CAMPUS}/qa/answers/${answerId}/report`;
  const formatDate = format(dateData, 'MMMM d, yyyy');
  const isSeller = userName === 'Seller';
  /* increment count when clicking yes */
  const [helpful, setHelpful] = React.useState(helpfulness);
  const [clickedYes, setClickedYes] = React.useState(false);
  const handleClickYes = () => {
    if (!clickedYes) {
      setHelpful(helpful + 1);
      setClickedYes(true);
      axios
        .put(helpfulURL, null, {
          headers: {
            Authorization: TOKEN,
          },
        })
        .then((result) => console.log('successfully updated helpfulness for selected answer: ', result))
        .catch((err) => console.log('failed to update helpfulness for selected answer', err));
    }
  };
  /* switch report tag when clicked to reported */
  const [reportState, setReportState] = React.useState('Report');
  const handleClickReport = () => {
    setReportState('Reported');
    answerList.splice(idx, 1);
    setAnswerList(answerList);
    axios
      .put(reportURL, null, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((result) => console.log('sucessfully reported answer: ', result))
      .catch((err) => console.log('failed to report answer: ', err));
  };

  return (
    <div>
      <span className='answer-footer' style={{ fontWeight: isSeller ? 'bold' : 'normal' }}>{`by ${userName},`}</span>
      <span className='answer-footer'>{`${formatDate}`}</span>
      <span className='answer-footer'>|</span>
      <span className='answer-footer'>Helpful?</span>

      <a href='#/' onClick={handleClickYes}>Yes</a>

      <span className='answer-footer'>{`(${helpful})`}</span>
      <span className='answer-footer'>|</span>
      <a href='#/' onClick={handleClickReport}>{reportState}</a>

    </div>
  );
};

export default Footer;

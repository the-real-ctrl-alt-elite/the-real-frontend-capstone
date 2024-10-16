import React from 'react';
import { format } from 'date-fns';

const Footer = ({ userName, dateData, helpfulness, answerList, setAnswerList, idx }) => {
  const formatDate = format(dateData, 'MMMM d, yyyy');
  const isSeller = userName === 'Seller';
  /* increment count when clicking yes */
  const [helpful, setHelpful] = React.useState(helpfulness);
  const [clickedYes, setClickedYes] = React.useState(false);
  const handleClickYes = () => {
    if (!clickedYes) {
      setHelpful(helpful + 1);
      setClickedYes(true);
    }
  };
  /* switch report tag when clicked to reported */
  const [reportState, setReportState] = React.useState('Report');
  const handleClickReport = () => {
    setReportState('Reported');
    answerList.splice(idx, 1);
    setAnswerList(answerList);
  }

  return (
    <div>
      <span>by </span>
      <span style={{ fontWeight: isSeller ? 'bold' : 'normal' }}>{userName}</span>
      <span>{`, ${formatDate} | Helpful?`}</span>
      <span><a href='#/' onClick={handleClickYes}>Yes</a> {`(${helpful}) | `}<a href='#/' onClick={handleClickReport}>{reportState}</a></span>
    </div>
  );
};

export default Footer;

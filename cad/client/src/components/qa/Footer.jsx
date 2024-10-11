import React from 'react';
import { format } from 'date-fns';

const Footer = ({ userName, dateData, helpfulness}) => {
  const formatDate = format(dateData, 'MMMM d, yyyy');
  const isSeller = userName === 'Seller';
  const [helpful, setHelpful] = React.useState(helpfulness);
  const [clickedYes, setClickedYes] = React.useState(false);
  const handleClickYes = () => {
    if (!clickedYes) {
      setHelpful(helpful + 1);
      setClickedYes(true);
    }
  };
  return (
    <div>
      <span>by </span>
      <span style={{fontWeight: isSeller ? 'bold' : 'normal'}}>{userName}</span>
      <span>{`, ${formatDate} | Helpful?`}</span>
      <span><a href='#' onClick={handleClickYes}>Yes</a> {`(${helpful}) | `}<a href='#'>Report</a></span>
    </div>
  );
};

export default Footer;

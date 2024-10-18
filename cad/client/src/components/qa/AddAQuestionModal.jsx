import React from 'react';

const AddAQuestionModal = ({ setOpenQuestionModal, productName }) => {
  const handleCloseQuestionModal = () => {
    setOpenQuestionModal(false);
  };
  return (
    <div className='modal-background'>
      <div className='modal-container'>
        <button className='modal-close-button' onClick={handleCloseQuestionModal}>X</button>
        <div className='modal-title'>
          <h3>Ask Your Question</h3>
          <h4>{`About the ${productName}`}</h4>
        </div>
        <div className='modal-body'>
          <label>Your Question *</label>
          <br />
          <textarea className='question-input' />
          <br />
          <label>What is your nickname *</label>
          <br />
          <input placeholder='Example:jackson11!' className='nickname-input' />
          <br />
          <small>For privacy reasons, do not use your full name or email address</small>
          <br />
          <label>Your email *</label>
          <br />
          <input className='email-input' placeholder='Why did you like the product or not' />
          <br />
          <small>For authentication reasons, you will not be emailed</small>
        </div>
        <div className='modal-footer'>
          <button type='button'>submit question</button>
        </div>
      </div>
    </div>
  );
};
export default AddAQuestionModal;

import React, { useState } from 'react';
import axios from 'axios';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS = process.env.CAMPUS_CODE;

const AddAQuestionModal = ({ setOpenQuestionModal, productName, productId }) => {
  const url = `${BASE_URL}${CAMPUS}/qa/questions`;
  const handleCloseQuestionModal = () => {
    setOpenQuestionModal(false);
  };
  const [questionInput, setQuestionInput] = useState('');
  const [nickNameInput, setNickNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleQuestionInput = (e) => {
    if (e.target.value.length <= 1000) {
      setQuestionInput(e.target.value);
    }
  };
  const handleNickNameInput = (e) => {
    if (e.target.value.length <= 60) {
      setNickNameInput(e.target.value);
    }
  };
  const handleEmailInput = (e) => {
    if (e.target.value.length <= 60) {
      setEmailInput(e.target.value);
    }
  };
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        url,
        {
          body: questionInput, name: nickNameInput, email: emailInput, product_id: productId,
        },
        {
          headers: {
            Authorization: TOKEN,
          },
        },
      )
      .then((result) => console.log('successfully submitted questions? status code:', result))
      .catch((err) => console.log('failed to submit answer', err));
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setOpenQuestionModal(false);
    }, 1000);
  };

  return (
    <div className='modal-background'>
      <div className='modal-container'>
        <button className='modal-close-button' onClick={handleCloseQuestionModal}>X</button>
        <div className='modal-title'>
          <h3>Ask Your Question</h3>
          <h4>{`About the ${productName}`}</h4>
        </div>
        <form onSubmit={handleQuestionSubmit}>
          <div className='modal-body'>
            <label>Your Question*</label>
            <small>(up to 1000 characters)</small>
            <br />
            <textarea className='question-input' onChange={handleQuestionInput} value={questionInput} required />
            <br />
            <br />
            <label>What is your nickname* </label>
            <small>(up to 60 characters)</small>
            <br />
            <input placeholder='Example:jackson11!' className='nickname-input' onChange={handleNickNameInput} value={nickNameInput} required />
            <br />
            <small>For privacy reasons, do not use your full name or email address</small>
            <br />
            <label>
              Your email*
            </label>
            <small>(up to 60 characters) </small>
            <br />
            <input type='email' className='email-input' placeholder='Why did you like the product or not' onChange={handleEmailInput} value={emailInput} required />
            <br />
            <small>For authentication reasons, you will not be emailed</small>
          </div>
          <div className='modal-footer'>
            <button type='submit'>submit question</button>
          </div>
          {showConfirmation && (
          <div id='submitConfirmation' className='confirmation-popup'>
            <p>Submitted!</p>
          </div>
          )}
        </form>

      </div>

    </div>
  );
};
export default AddAQuestionModal;

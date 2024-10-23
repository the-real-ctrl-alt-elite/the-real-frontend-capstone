import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import UploadedPhotoes from './UploadedPhotos';
import DragAndDrop from '../reviewRating/components/DragAndDrop';

const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS = process.env.CAMPUS_CODE;

const AddAnAnswerModal = ({
  setOpenAnswerModal, questionName, productName, questionId,
}) => {
  const submitURL = `${BASE_URL}${CAMPUS}/qa/questions/${questionId}/answers`;
  const handleCloseAnswerModal = () => {
    setOpenAnswerModal(false);
  };
  // setting up the upload photo
  const [image, setImage] = useState(null);
  const [photoList, setPhotoList] = useState([]);
  const [photoLength, setPhotoLength] = useState(photoList.length);
  const [showUpload, setShowUpload] = useState(true);
  const handleUploadFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  useEffect(() => {
    if (image) {
      setPhotoList((prevPhotos) => [...prevPhotos, image]);
    }
  }, [image]);
  useEffect(() => {
    setPhotoLength(photoList.length);
    if (photoLength >= 5) {
      setShowUpload(false);
    } else {
      setShowUpload(true);
    }
  }, [photoList, photoLength]);
  // submit form
  const [answerInput, setAnswerInput] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleAnswerInput = ((e) => {
    if (e.target.value.length < 1001) {
      setAnswerInput(e.target.value);
    }
  });
  const [nicknameInput, setNicknameInput] = useState('');
  const handleNicknameInput = (e) => {
    if (e.target.value.length < 61) {
      setNicknameInput(e.target.value);
    }
  };
  const [emailInput, setEmailInput] = useState('');
  const handleEmailInput = (e) => {
    if (e.target.value.length < 61) {
      setEmailInput(e.target.value);
    }
  };
  const handleFormSubmition = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setOpenAnswerModal(false);
    }, 1000);
    axios
      .post(submitURL, {
        body: answerInput,
        name: nicknameInput,
        email: emailInput,
        photos: photoList,
      }, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((result) => console.log('successuflly submitted an answer:', result))
      .catch((err) => console.log('failed to submit the answer', err));
  };

  const handleFilesSelected = (test) => {
    console.log('this is what is returned on file select', test);
  };

  return (
    <div className='modal-background'>
      <div className='modal-container answer-container'>
        <button className='modal-close-button' onClick={handleCloseAnswerModal}>X</button>
        <div className='modal-title'>
          <h3>Submit Your Answer</h3>
          <h4>
            {`${productName} : ${questionName}`}
          </h4>
        </div>
        <form onSubmit={handleFormSubmition}>
          <div className='modal-body'>
            <label>Your Answer* </label>
            <small>(up to 1000 characters)</small>
            <br />
            <textarea className='answer-input' onChange={handleAnswerInput} value={answerInput} required />
            <br />
            <label>
              Nickname
              <sup>*</sup>
            </label>
            <small>(up to 60 characters)</small>
            <br />
            <input className='nickname-input' placeholder='Example: jack543!' onChange={handleNicknameInput} value={nicknameInput} required />
            <br />
            <small>For privacy reasons, do not use your full name or email address</small>
            <br />
            <label>
              Email
              <sup>*</sup>
            </label>
            <small>(up to 60 characters)</small>
            <br />
            <input type='email' className='email-input' placeholder='Example: jack@email.com' onChange={handleEmailInput} value={emailInput} required />
            <br />
            <small>For authentication reasons, you will not be emailed</small>
            <br />

            {/* {showUpload && <input type='file' onChange={handleUploadFile} />}
            <br /> */}
            <DragAndDrop onFilesSelected={handleFilesSelected} height='200px' width='100%' />
            {/* {showUpload && <small>(choose up to 5 photos)</small>}
            <UploadedPhotoes urls={photoList} multiple /> */}
          </div>
          <div className='modal-footer'>
            <button>Submit Answer</button>
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
export default AddAnAnswerModal;

import React from 'react';
import UploadedPhotoes from './UploadedPhotos';

const AddAnAnswerModal = ({ setOpenAnswerModal }) => {
  const fakePhotoList = ['https://mdibl.org/wp-content/uploads/2023/11/52187100510_b12607040a_o.png', 'https://www.currentaffairs.org/hubfs/Imported_Blog_Media/c_h8-ndEV_RYDVFYH6TZr1see_rPWBywxxv1jkIemLRbMz41xQQjwhQwQYd-zklPvLL-9A25SuV21G0U5HMY_L0HyktJOKKC-b9G-TIYy7QBXGpOp9AQJBJ9QQU1jMzLJ5lpBJv4J0xArPKDxI317g-1.png', 'https://bluezoo.us/wp-content/uploads/2023/12/iStock-1401377395.jpg', 'https://avonturia.nl/wp-content/uploads/2023/07/Axolotl-6.png', 'https://avonturia.nl/wp-content/uploads/2023/07/Donkere-Axolotl-Kleur.jpg'];
  const handleCloseAnswerModal = () => {
    setOpenAnswerModal(false);
  };
  return (
    <div className='modal-background'>
      <div className='modal-container'>
        <button className='modal-close-button' onClick={handleCloseAnswerModal}>X</button>
        <div className='modal-title'>
          <h3>Submit your answer</h3>
          <h4>[Product Name]: [Question body]</h4>
        </div>
        <div className='modal-body'>
          <label>Your Answer * </label>
          <br />
          <textarea className='answer-input' />
          <br />
          <label>What is your nickname *</label>
          <br />
          <input className='nickname-input' placeholder='Example: jack543!' />
          <br />
          <small>For privacy reasons, do not use your full name or email address</small>
          <br />
          <label>Your email *</label>
          <br />
          <input className='email-input' placeholder='Example: jack@email.com' />
          <br />
          <small>For authentication reasons, you will not be emailed</small>
          <br />
          <input type='file' />
          <UploadedPhotoes urls={fakePhotoList} />
        </div>
        <div className='modal-footer'>
          <button>submit answer</button>
        </div>
      </div>
    </div>
  );
};
export default AddAnAnswerModal;

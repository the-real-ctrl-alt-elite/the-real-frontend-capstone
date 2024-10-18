import React, { useState, useEffect } from 'react';
import UploadedPhotoes from './UploadedPhotos';

const AddAnAnswerModal = ({ setOpenAnswerModal, questionName, productName }) => {
  console.log('questionname is: ', questionName);
  // const fakePhotoList = ['https://mdibl.org/wp-content/uploads/2023/11/52187100510_b12607040a_o.png', 'https://www.currentaffairs.org/hubfs/Imported_Blog_Media/c_h8-ndEV_RYDVFYH6TZr1see_rPWBywxxv1jkIemLRbMz41xQQjwhQwQYd-zklPvLL-9A25SuV21G0U5HMY_L0HyktJOKKC-b9G-TIYy7QBXGpOp9AQJBJ9QQU1jMzLJ5lpBJv4J0xArPKDxI317g-1.png', 'https://bluezoo.us/wp-content/uploads/2023/12/iStock-1401377395.jpg', 'https://avonturia.nl/wp-content/uploads/2023/07/Axolotl-6.png', 'https://avonturia.nl/wp-content/uploads/2023/07/Donkere-Axolotl-Kleur.jpg'];

  // const fakePhotoList = ['https://mdibl.org/wp-content/uploads/2023/11/52187100510_b12607040a_o.png'];
  const handleCloseAnswerModal = () => {
    setOpenAnswerModal(false);
  };
  const [image, setImage] = useState(null);
  const [fakePhotoList, setFakePhotoList] = useState([]);
  const [photoLength, setPhotoLength] = useState(fakePhotoList.length);
  const [showUpload, setShowUpload] = useState(true);
  const handleUploadFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log('e.targt.files: ', e.target.files);
      console.log('e.target.files[0]', e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  useEffect(() => {
    if (image) {
      setFakePhotoList((prevPhotos) => [...prevPhotos, image]);
    }
  }, [image]);
  useEffect(() => {
    setPhotoLength(fakePhotoList.length);
    if (photoLength >= 5) {
      setShowUpload(false);
    } else {
      setShowUpload(true);
    }
  }, [fakePhotoList, photoLength]);
  return (
    <div className='modal-background'>
      <div className='modal-container'>
        <button className='modal-close-button' onClick={handleCloseAnswerModal}>X</button>
        <div className='modal-title'>
          <h3>Submit your answer</h3>
          <h4>
            {productName}
            :
            {questionName}
          </h4>
        </div>
        <form>
          <div className='modal-body'>
            <label>Your Answer* </label>
            <small>(up to 1000 characters)</small>
            <br />
            <textarea className='answer-input' required />
            <br />
            <label>What is your nickname *</label>
            <small>(up to 60 characters)</small>
            <br />
            <input className='nickname-input' placeholder='Example: jack543!' required />
            <br />
            <small>For privacy reasons, do not use your full name or email address</small>
            <br />
            <label>Your email *</label>
            <small>(up to 60 characters)</small>
            <br />
            <input type='email' className='email-input' placeholder='Example: jack@email.com' required />
            <br />
            <small>For authentication reasons, you will not be emailed</small>
            <br />
            {showUpload && <input type='file' onChange={handleUploadFile} />}
            <br />
            {showUpload && <small>(choose up to 5 photos)</small>}
            <UploadedPhotoes urls={fakePhotoList} multiple />
          </div>
          <div className='modal-footer'>
            <button>submit answer</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddAnAnswerModal;

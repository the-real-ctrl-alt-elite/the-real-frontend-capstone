import React, { useEffect, useState } from 'react';

const DragAndDrop = ({ onFilesSelected, width, height }) => {
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      const temp = files.concat(newFiles);
      temp.forEach((img) => {
        if (!img.url) {
          img.url = URL.createObjectURL(img);
        }
      });
      setFiles(temp.slice(0, 5));
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      const temp = files.slice();
      temp.push(newFiles);
      setFiles(temp.slice(0, 5));
    }
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  return (
    <section className='drag-drop' style={{ width, height }}>
      <div
        className={`document-uploader ${
          files.length > 0 ? 'upload-box active' : 'upload-box'
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <div className='upload-info'>
          <i className='fa-solid fa-cloud-arrow-up' />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <small>Drag and drop your photos here (limit 5)</small>
            <small>
              Limit 15MB per file. Supported files: .jpeg, .png
            </small>
          </div>
        </div>
        <input
          type='file'
          hidden
          id='browse'
          onChange={handleFileChange}
          accept='image/*'
          multiple
        />
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {files.length > 0 && (
          <div className='file-list'>
            <div
              className='file-list-container'
            >
              {files.map((file, index) => (
                <div
                  className='file-item'
                  key={file.url}
                >
                  <div className='file-info'>
                    <img src={file.url} alt='' style={{ maxWidth: '4rem', maxHeight: '4rem', objectFit: 'contain' }} />
                    <button
                      type='button'
                      className='uploadImageRemoveBtn'
                      onClick={() => { handleRemoveFile(index); }}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className='success-file'>
            <i className='fa-solid fa-check' />
            <p>
              {files.length}
              {' '}
              file(s) selected
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DragAndDrop;

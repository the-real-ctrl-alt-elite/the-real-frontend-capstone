import React from 'react';

const ModalFrame = ({
  background,
  border,
  buttonText,
  component,
  componentProps,
  closeModal,
  fontColor,
  padding,
}) => {
  // provide inline css or use these defaults
  const usedBorder = border || 'none';
  const usedButtonText = buttonText;
  const usedPadding = padding || '.55rem';
  const usedFontColor = fontColor || 'white';
  return (
    <div
      className='modelFrame'
      style={{
        position: 'relative',
        maxHeight: '100vh',
        padding: `${usedPadding}`,
        border: `${usedBorder}`,
        zIndex: '20',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '1rem',
      }}
    >
      {component({ ...componentProps })}
      <button
        type='button'
        onClick={() => closeModal()}
        style={{
          position: 'absolute',
          zIndex: '21',
          top: `calc(${usedPadding} + 0.65rem)`,
          right: `calc(${usedPadding} + 0.65rem)`,
          borderRadius: '100%',
          height: '2.33rem',
          width: '2.33rem',
          background: 'rgba(44,44,44,0.5)',
          // boxShadow: '0 0 2px 2px rgba(22,22,22,0.5)',
          color: `${usedFontColor}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <i className='fa-regular fa-x modal-close' />
      </button>
    </div>
  );
};

export default ModalFrame;

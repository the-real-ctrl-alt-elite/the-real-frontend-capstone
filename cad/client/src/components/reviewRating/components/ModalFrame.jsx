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
  const usedButtonText = buttonText || 'X';
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
        zIndex: '5',
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
          top: `calc(${usedPadding} + 0.65rem)`,
          right: `calc(${usedPadding} + 0.65rem)`,
          borderRadius: '1rem',
          height: '2rem',
          width: '2rem',
          background: 'rgba(22,22,22,0.5)',
          boxShadow: '0 0 2px 2px rgba(22,22,22,0.5)',
          color: `${usedFontColor}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {usedButtonText}
      </button>
    </div>
  );
};

export default ModalFrame;

import React from 'react';

const ModalFrame = ({
  border,
  buttonText,
  component,
  componentProps,
  closeModal,
  fontColor,
  padding,
}) => {
  // provide inline css or use these defaults
  const usedBorder = border || '1px solid white';
  const usedButtonText = buttonText || 'X';
  const usedPadding = padding || 'inherit';
  const usedFontColor = fontColor || 'white';
  return (
    <div
      style={{
        position: 'relative',
        maxHeight: '75vh',
        maxWidth: '75vw',
        padding: `${usedPadding}`,
        border: `${usedBorder}`,
        zIndex: '3',
      }}
    >
      {component(componentProps)}
      <button
        type='button'
        onClick={() => closeModal()}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
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

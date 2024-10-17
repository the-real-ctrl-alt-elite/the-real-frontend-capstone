/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ModalFrame from './ModalFrame';

// pass componentProps as object to access properties through normal destructuring
// at top level of nested component

const ModalBackground = ({
  background,
  backgroundClose,
  border,
  buttonText,
  closeModal,
  component,
  componentProps,
  fontColor,
  padding,
  innerPadding,
  top,
}) => {
  // top is only used for pages with greater than 100vh functionality
  // otherwise it can be left at 0;
  // background can also be set with any color scheme
  // closeModal needs to be an event that swaps the model state from
  // active to inactive, for example setModalState(!modalState)
  // which gets passed all the way down to an x button in modelFrame

  const usedTop = top || '0';
  const usedBackground = background || 'rgba(22,22,22,0.5)';
  const usedBackgroundClose = backgroundClose !== undefined ? backgroundClose : true;
  const usedPadding = padding || '2rem';
  const usedBorder = border || 'none';
  const usedButtonText = buttonText || 'X';
  const usedFontColor = fontColor || 'white';
  const usedInnerPadding = innerPadding || '.55rem';

  const handleClick = (e) => {
    if (usedBackgroundClose) {
      if (e.target === document.getElementById('modalBackground')) {
        closeModal();
      }
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      id='modalBackground'
      onClick={(e) => { handleClick(e); }}
      style={{
        position: 'fixed',
        top: `${usedTop}`,
        left: '0',
        width: '100vw',
        height: '100vh',
        background: `${usedBackground}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: `${usedPadding}`,
        zIndex: '3',

      }}
    >
      <div
        style={{ zIndex: '4' }}
      >
        <ModalFrame
          border={usedBorder}
          buttonText={usedButtonText}
          component={component}
          componentProps={componentProps}
          closeModal={closeModal}
          fontColor={usedFontColor}
          padding={usedInnerPadding}
        />
      </div>
    </div>
  );
};

export default ModalBackground;

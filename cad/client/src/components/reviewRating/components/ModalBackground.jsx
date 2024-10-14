import React from 'react';
import ModalFrame from './ModalFrame';

const ModalBackground = ({
  background,
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
  const usedPadding = padding || '2rem';
  const usedBorder = border || '1px solid white';
  const usedButtonText = buttonText || 'X';
  const usedFontColor = fontColor || 'white';
  const usedInnerPadding = innerPadding || '2rem';

  return (
    <div
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
  );
};

export default ModalBackground;

const getDefaultStyle = (productStyles = []) => {
  return productStyles.find((result) => result['default?'] === true);
};

// eslint-disable-next-line import/prefer-default-export
export { getDefaultStyle };

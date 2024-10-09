module.exports = {
  extends: ['airbnb', 'airbnb/hooks'], // Use Airbnb rules + React Hooks rules
  env: {
    browser: true, // Enable browser globals like `window` and `document`
    es2021: true, // Enable modern JavaScript (ES6+)
    node: true, // Enable Node.js globals
  },
  parserOptions: {
    ecmaVersion: 12, // Support ECMAScript 2021 features
    sourceType: 'module', // Allow use of ES6 modules
  },
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': ['error', { varsIgnorePattern: '^use(State|Effect)$' }],
    'react/function-component-definition': 'off',
    'arrow-body-style': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'max-len': ['off'],
  },
};

module.exports = {
  root: true,
  extends: ['@react-native-community', '@react-native-community/eslint-config'],
  rules: {
    eqeqeq: 'off',
    'react-hooks/exhaustive-deps': 'off',
    radix: 'off',
    'react-hooks/rules-of-hooks': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
};

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-optional-catch-binding'],
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@components': './src/components',
          '@navigator': './src/navigator',
          '@theme': './src/theme',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};

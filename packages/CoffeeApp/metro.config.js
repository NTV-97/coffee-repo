/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

// const modulePaths = require('./packager/modulePaths');
// const resolve = require('path').resolve;
// const fs = require('fs');

// // Update the following line if the root folder of your app is somewhere else.
// const ROOT_FOLDER = resolve(__dirname, '..');

// const config = {
//   transformer: {
//     getTransformOptions: async () => {
//       const moduleMap = {};
//       modulePaths.forEach((path) => {
//         if (fs.existsSync(path)) {
//           moduleMap[resolve(path)] = true;
//         }
//       });
//       return {
//         preloadedModules: moduleMap,
//         transform: { inlineRequires: { blockList: moduleMap }, experimentalImportSupport: false },
//       };
//     },
//   },
//   projectRoot: ROOT_FOLDER,
// };

// module.exports = config;

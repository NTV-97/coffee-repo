import { AppRegistry } from 'react-native';
import App from './packages/CoffeeApp/src/App';
import { name as appName } from './packages/CoffeeApp/app.json';
const modules = require.getModules();
const moduleIds = Object.keys(modules);
const loadedModuleNames = moduleIds
  .filter((moduleId) => modules[moduleId].isInitialized)
  .map((moduleId) => modules[moduleId].verboseName);
const waitingModuleNames = moduleIds
  .filter((moduleId) => !modules[moduleId].isInitialized)
  .map((moduleId) => modules[moduleId].verboseName);

console.log('loaded:', loadedModuleNames.length, 'waiting:', waitingModuleNames.length);

// grab this text blob, and put it in a file named packager/modulePaths.js
console.log(`module.exports = ${JSON.stringify(loadedModuleNames.sort(), null, 2)};`);

require.Systrace.beginEvent = (message) => {
  // eslint-disable-next-line no-undef
  if (message.includes(problematicModule)) {
    throw new Error();
  }
};

AppRegistry.registerComponent(appName, () => App);

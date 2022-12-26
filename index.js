import { AppRegistry } from 'react-native';
import App from './packages/CoffeeApp/src/App';
import { name as appName } from './packages/CoffeeApp/app.json';

AppRegistry.registerComponent(appName, () => App);

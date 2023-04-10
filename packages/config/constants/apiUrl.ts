// export const API_URI = 'http://faucetbox.win/api/graphql';
import { Platform } from 'react-native';

export const API_URI =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api/graphql'
    : 'http://localhost:3000/api/graphql';

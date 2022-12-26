import { useState, useRef, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const appStateChangeHandler = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    };
    AppState.addEventListener('change', appStateChangeHandler);

    return () => {
      //@ts-ignore
      AppState.removeEventListener('change', appStateChangeHandler);
    };
  }, []);
  return appStateVisible;
};

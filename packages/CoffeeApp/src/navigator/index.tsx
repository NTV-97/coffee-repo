import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { RootStackParamList } from './types';
import { SplashScreen } from '../screens/SplashScreen';
import { HomeScreen } from '../screens/home';
import { SignInScreen, SignUpScreen, Introduction } from '../screens/auth';
import { SCREEN_NAME } from 'config/constants';
import { Context } from 'config/context';
import { navigationUtils, storage } from 'config/utils';

const { HOME, SIGN_IN, SIGN_UP, INTRODUCTION_AUTH } = SCREEN_NAME;
const { navigationRef } = navigationUtils;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStack: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const { state, setToken } = useContext(Context);
  const { token } = state;
  useEffect(() => {
    const getToken = async () => {
      const _token = await storage.getItem('token');
      if (_token) {
        setToken(_token);
      }
    };
    getToken();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={token?.length ? HOME : INTRODUCTION_AUTH}>
          {token?.length ? (
            <>
              <Stack.Screen name={HOME} component={HomeScreen} />
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                {/* <Stack.Screen name={SCREEN_NAME.ADD_TABLE} component={AddTable} />
              <Stack.Screen name={SCREEN_NAME.ADD_MERCHANDISE} component={AddMerchandise} />
              <Stack.Screen
                name={SCREEN_NAME.ADD_MERCHANDISE_GROUP}
                component={AddMerchandiseGroup}
              />
              <Stack.Screen
                name={SCREEN_NAME.ADD_UNIT_MERCHANDISE}
                component={AddUnitMerchandise}
              />
              <Stack.Screen name={SCREEN_NAME.ADD_ORDER} component={AddOrder} /> */}
              </Stack.Group>
            </>
          ) : (
            <>
              <Stack.Screen
                name={INTRODUCTION_AUTH}
                component={Introduction}
                options={{
                  animationTypeForReplace: token?.length ? 'push' : 'pop',
                }}
              />
              <Stack.Screen name={SIGN_IN} component={SignInScreen} />
              <Stack.Screen name={SIGN_UP} component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

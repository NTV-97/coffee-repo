import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { BottomTabParamsList, RootStackParamList } from './types';
import { SplashScreen } from '../screens/SplashScreen';
import { HomeScreen } from '../screens/home';
import { SignInScreen, SignUpScreen, Introduction } from '../screens/auth';
import { SCREEN_NAME } from 'config/constants';
import { Context } from 'config/context';
import { navigationUtils, storage } from 'config/utils';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SettingScreen } from '../screens/setting/SettingScreen';

const { HOME, SIGN_IN, SIGN_UP, INTRODUCTION_AUTH, BOTTOM_TAB } = SCREEN_NAME;
const { navigationRef } = navigationUtils;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createMaterialBottomTabNavigator();

const BottomTab: React.FC<NativeStackScreenProps<RootStackParamList, typeof BOTTOM_TAB>> = ({
  navigation,
  route,
}) => {
  useEffect(() => {
    navigation.setParams({ HOME: { keyName: 'Home' } });
  }, []);

  return (
    <Tab.Navigator>
      {/* @ts-ignore */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export const MainStack: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const { state, setToken } = useContext(Context);
  const { token } = state;
  console.log("🚀 ~ file: index.tsx:44 ~ token:", token)
  useEffect(() => {
    const getToken = async () => {
      const _token = await storage.getItem('token');
      console.log("🚀 ~ file: index.tsx:48 ~ getToken ~ _token:", _token.length)
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
          initialRouteName={!token?.length ? HOME : INTRODUCTION_AUTH}>
          {token?.length ? (
            <>
              {/* <Stack.Screen name={HOME} component={HomeScreen} /> */}
              <Stack.Screen name={BOTTOM_TAB} component={BottomTab} />
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

import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, TouchableOpacity, ViewStyle, useColorScheme } from 'react-native';
import { RootStackParamList } from './types';
import { SplashScreen } from '../screens/SplashScreen';
import { HomeScreen } from '../screens/home';
import { SignInScreen, SignUpScreen, Introduction } from '../screens/auth';
import {
  BOTTOM_SPACE,
  DEFAULT_NAVBAR_HEIGHT,
  DEVICE,
  SCREEN_NAME,
  ScreenNameType,
} from 'config/constants';
import { Context } from 'config/context';
import { navigationUtils, storage } from 'config/utils';
import { SettingScreen } from '../screens/setting/SettingScreen';
import { CartScreen } from '../screens/cart/CartScreen';
import { ProductDetail } from '../screens/product/ProductDetail';
import { ProductByCategory } from '../screens/product/ProductByCategory';
import { UpdateUserInfo } from '../screens/user/UpdateUserInfo';
import { OrderStatus } from '../screens/cart/OrderStatus';
import { OrderHistory } from '../screens/cart/OrderHistory';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, sizes } from 'config/theme';
import { Div } from 'config/components';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Order } from '../screens/cart/Order';

const {
  HOME,
  SIGN_IN,
  SIGN_UP,
  INTRODUCTION_AUTH,
  BOTTOM_TAB,
  CART,
  SETTING,
  PRODUCT_DETAIL,
  PRODUCT_BY_CATEGORY,
  UPDATE_USER_INFO,
  ORDER,
  ORDER_STATUS,
  ORDER_HISTORY,
} = SCREEN_NAME;
const { navigationRef } = navigationUtils;

const Stack = createNativeStackNavigator<RootStackParamList>();
const TabBar = createBottomTabNavigator();

const borderLeftRadius: ViewStyle = {
  borderTopLeftRadius: sizes.radius * 4,
};
const borderRightRadius: ViewStyle = {
  borderTopRightRadius: sizes.radius * 4,
};

const AnimActiveTab = ({
  routeLength,
  indexNextScreen,
  indexFocused,
}: {
  routeLength: number;
  indexNextScreen: number;
  indexFocused: number;
}) => {
  const slideValue = useRef(new Animated.Value(0)).current;
  const index = indexFocused ? indexFocused : indexNextScreen;
  Animated.timing(slideValue, {
    toValue: index,
    duration: 200,
    useNativeDriver: true,
  }).start(() => {});
  const animatedStyle: ViewStyle = {
    transform: [
      {
        //@ts-ignore
        translateX: slideValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, DEVICE.WINDOW_WIDTH / 3, DEVICE.WINDOW_WIDTH * (2 / 3)],
        }),
      },
    ],
  };
  return (
    <Div
      width={DEVICE.WINDOW_WIDTH / 3}
      height={'100%'}
      backgroundColor={colors.whiteOpacity}
      absolute
      animated
      positionTop={0}
      zIndex={1}
      style={[
        index === 0 ? borderLeftRadius : index === routeLength - 1 ? borderRightRadius : undefined,
        animatedStyle,
      ]}
    />
  );
};

const TabBarIcon = (props: BottomTabBarProps) => {
  const { state } = props;
  const { routes } = state;
  const [indexNextScreen, setIndexNextScreen] = useState(0);

  const onNavigate = (screenName: ScreenNameType, indexScreen: number) => {
    setIndexNextScreen(indexScreen);
    navigationUtils.navigate(screenName);
  };

  return (
    <Div
      height={DEFAULT_NAVBAR_HEIGHT + BOTTOM_SPACE}
      row
      backgroundColor={colors.transparent}
      wrap="wrap"
      shadow
      positionTop={DEVICE.WINDOW_HEIGHT - (DEFAULT_NAVBAR_HEIGHT + BOTTOM_SPACE)}
      absolute>
      <AnimActiveTab
        routeLength={routes.length}
        indexNextScreen={indexNextScreen}
        indexFocused={state.index}
      />
      {
        //@ts-ignore
        routes.map((e: RouteProp<ParamListBase, ScreenNameType>, index: number) => {
          const focused = state.index === index;
          const iconsFocused = {
            [HOME]: 'home',
            [CART]: 'cart',
            [SETTING]: 'settings',
          };
          const iconsUnFocused = {
            [HOME]: 'home-outline',
            [CART]: 'cart-outline',
            [SETTING]: 'settings-outline',
          };
          //@ts-ignore
          const icons = focused ? iconsFocused[e.name] : iconsUnFocused[e.name];
          return (
            <TouchableOpacity
              onPress={() => onNavigate(e.name, index)}
              activeOpacity={1}
              key={e.key}>
              <Div
                center
                middle
                height={'100%'}
                width={DEVICE.WINDOW_WIDTH / 3}
                backgroundColor={colors.darkBlue}
                style={
                  index === 0
                    ? borderLeftRadius
                    : index === routes.length - 1
                    ? borderRightRadius
                    : undefined
                }>
                <Div zIndex={99}>
                  <Ionicons name={icons} size={sizes.base * 3} color={colors.white} />
                </Div>
              </Div>
            </TouchableOpacity>
          );
        })
      }
    </Div>
  );
};

const BottomTabBar: React.FC = () => {
  return (
    <TabBar.Navigator
      initialRouteName={HOME}
      screenOptions={() => ({
        freezeOnBlur: true,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={(props) => <TabBarIcon {...props} />}>
      <TabBar.Screen name={HOME} component={HomeScreen} />
      <TabBar.Screen name={CART} component={CartScreen} />
      <TabBar.Screen name={SETTING} component={SettingScreen} />
    </TabBar.Navigator>
  );
};

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
            contentStyle: { backgroundColor: colors.brown },
          }}
          initialRouteName={!token?.length ? HOME : INTRODUCTION_AUTH}>
          {token?.length ? (
            <>
              {/* <Stack.Screen name={HOME} component={HomeScreen} /> */}
              <Stack.Screen name={BOTTOM_TAB} component={BottomTabBar} />
              <Stack.Screen name={PRODUCT_DETAIL} component={ProductDetail} />
              <Stack.Screen name={PRODUCT_BY_CATEGORY} component={ProductByCategory} />
              <Stack.Screen name={ORDER} component={Order} />
              <Stack.Screen name={ORDER_STATUS} component={OrderStatus} />
              <Stack.Screen name={ORDER_HISTORY} component={OrderHistory} />
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name={UPDATE_USER_INFO} component={UpdateUserInfo} />
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

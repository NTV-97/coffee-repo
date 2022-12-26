import {
  createNavigationContainerRef,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';
import { ScreenNameType } from '../constants';

export const navigationRef = createNavigationContainerRef();

const isReady = navigationRef.isReady();

export const navigate = (name: ScreenNameType, params?: any) => {
  //@ts-ignore
  navigationRef.navigate(name, params);
};

export const goBack = () => {
  navigationRef.goBack();
};

export const push = (name: ScreenNameType, params?: any) => {
  navigationRef.dispatch(StackActions.push(name, params));
};

export const pop = (count?: number) => {
  navigationRef.dispatch(StackActions.pop(count));
};

export const popToTop = () => {
  navigationRef.dispatch(StackActions.popToTop());
};

export const replace = (name: ScreenNameType, params?: any) => {
  navigationRef.dispatch(StackActions.replace(name, params));
};

export const navigationDispatch = (action: any) => {
  navigationRef.dispatch(action);
};

export const openDrawer = () => {
  navigationRef.dispatch(DrawerActions.openDrawer());
};

export const closeDrawer = () => {
  navigationRef.dispatch(DrawerActions.closeDrawer());
};

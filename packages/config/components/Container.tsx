import { SafeAreaView } from 'react-native';
import React from 'react';
import { Div, IPropsDiv } from './base';
import { BOTTOM_SPACE } from '../constants';

interface IPropsContainer {
  isHeader?: boolean;
  isBack?: boolean;
  title?: string;
  isRightClose?: boolean;
  isDrawer?: boolean;
}

export const Container: React.FC<IPropsContainer & IPropsDiv> = ({
  isBack = false,
  isHeader = false,
  title = '',
  isRightClose = false,
  isDrawer = false,
  children,
  ...props
}) => {
  return (
    <Div flex={1} white {...props}>
      <SafeAreaView>
        {/* {isHeader && (
          <Header isBack={isBack} title={title} isRightClose={isRightClose} isDrawer={isDrawer} />
        )} */}
      </SafeAreaView>
      {children}
    </Div>
  );
};

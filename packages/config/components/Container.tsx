import { SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Div, IPropsDiv } from './base';
import { BOTTOM_SPACE } from '../constants';
import { Header } from './Header';

interface IPropsContainer {
  isHeader?: boolean;
  isBack?: boolean;
  title?: string;
  isRightClose?: boolean;
  isScroll?: boolean;
}

export const Container: React.FC<IPropsContainer & IPropsDiv> = ({
  isBack = false,
  isHeader = false,
  title = '',
  isRightClose = false,
  isScroll = false,
  children,
  ...props
}) => {
  return (
    <Div flex={1} white {...props}>
      <SafeAreaView>
        {isHeader && <Header isBack={isBack} title={title} isRightClose={isRightClose} />}
      </SafeAreaView>
      {isScroll ? (
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </Div>
  );
};

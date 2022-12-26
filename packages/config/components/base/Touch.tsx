import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export const Touch: FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity {...props} style={[styles.touch, props.style]}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

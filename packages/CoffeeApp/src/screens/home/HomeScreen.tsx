import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { storage } from 'config/utils';

export const HomeScreen: React.FC = () => {
  //   useEffect(() => {
  //     const getToken = async () => {
  //       const _token = await storage.removeItem('token');
  //     };
  //     getToken();
  //   }, []);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

import React, { useEffect, useState } from 'react';
import { storage } from 'config/utils';
import { Container, Div, Text, Header } from 'config/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamsList, RootStackParamList } from '@navigator/types';
import { SCREEN_NAME } from 'config/constants';
import { images } from '../../assets';

const { HOME } = SCREEN_NAME;

export const HomeScreen: React.FC<NativeStackScreenProps<RootStackParamList, typeof HOME>> = ({
  navigation,
  route,
}) => {
  console.log('🚀 ~ file: HomeScreen.tsx:11 ~ navigation.getState', route.path);

  const imageBanners = [images.homeBanner, images.homeBanner1, images.homeBanner2];
  const imageNews = [images.news, images.news1];

  const [textSearch, setTextSearch] = useState('');
  useEffect(() => {
    const getToken = async () => {
      const _token = await storage.removeItem('token');
    };
    getToken();
  }, [route]);

  const onChangeSearch = (text: string) => {
    setTextSearch(text);
  };

  return (
    <Container>
      <Header isSearch textSearch={textSearch} onChangeSearch={onChangeSearch} />
      <Div flex={1} center middle>
        <Text h1 bold blue>
          HomeScreen
        </Text>
      </Div>
    </Container>
  );
};

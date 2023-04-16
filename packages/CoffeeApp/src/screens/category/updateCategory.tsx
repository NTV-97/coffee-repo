import { Alert, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BOTTOM_SPACE, SCREEN_NAME } from 'config/constants';
import { RootStackParamList } from '@navigator/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useGetCategoryQuery, useUpdateCategoryMutation } from 'graphql-hook';
import { Container, Div, Text } from 'config/components';
import { colors, sizes } from 'config/theme';
import { navigationUtils } from 'config/utils';
import { launchImageLibrary } from 'react-native-image-picker';
import { fonts } from '../../assets';

const { UPDATE_CATEGORY } = SCREEN_NAME;

export const UpdateCategory: React.FC<
  NativeStackScreenProps<RootStackParamList, typeof UPDATE_CATEGORY>
> = ({ route }) => {
  const { data, refetch } = useGetCategoryQuery({ variables: { id: route.params.idCategory } });
  const [update] = useUpdateCategoryMutation({
    onCompleted: (_data) => {
      if (_data) {
        refetch();
        navigationUtils.goBack();
      }
    },
  });

  const category = data?.getCategory;

  const [image, setImage] = useState(category?.image ?? '');
  const [name, setName] = useState(category?.name ?? '');
  const [description, setDescription] = useState(category?.description ?? '');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description ?? '');
      setImage(category.image ?? '');
    }
  }, [category]);

  const onChangeName = (text: string) => {
    setName(text);
  };
  const onChangeDescription = (text: string) => {
    setDescription(text);
  };
  const onPressUploadImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 600,
      maxHeight: 600,
    });
    if (result.assets) {
      if ((result.assets[0].fileSize ?? 0) > 5242880) {
        return Alert.alert(
          "Like coffee say's",
          'Oops! the photos are too big. Max photo size is 4MB per photo. Please reduce the resolution or file size and retry',
          [{ text: 'OK', onPress: () => console.log('ok Pressed') }],
          { cancelable: false },
        );
      }
      setImage(`data:${result.assets[0].type};base64,${result.assets[0].base64}`);
    }
  };
  const onUpdate = () => {
    const variables = {
      category: {
        name,
        description,
        image: image,
      },
      id: route.params.idCategory,
    };
    update({ variables });
  };
  return (
    <Container backgroundColor={colors.brown}>
      <Div padding={[sizes.base, sizes.base * 2]} row center>
        <Div flex={1} center>
          <Text title bold white>
            Chỉnh sửa danh mục
          </Text>
        </Div>
        <TouchableOpacity onPress={() => navigationUtils.goBack()}>
          <Icon name="close" size={sizes.base * 4} color={colors.white} />
        </TouchableOpacity>
      </Div>
      <Div center mt={sizes.base * 2}>
        <Div center mt={sizes.base * 2}>
          <Div width={150} height={150} lightGray>
            <TouchableOpacity onPress={onPressUploadImage}>
              <Image source={{ uri: image }} style={styles.image} />
              <Div
                width={'30%'}
                height={'30%'}
                absolute
                positionBottom={0.1}
                positionRight={0.1}
                center
                middle
                backgroundColor={colors.blackOpacity}
                radius={sizes.base * 4}>
                <Icon name="edit" size={sizes.base * 3} color={colors.green} />
              </Div>
            </TouchableOpacity>
          </Div>
        </Div>
      </Div>
      <Div mt={sizes.base} padding={[sizes.base, sizes.base * 2]} flex={1}>
        <Text medium header>
          Tên:
        </Text>
        <Div
          mt={sizes.base}
          mb={sizes.base * 2}
          radius={sizes.radius * 2}
          pl={sizes.base}
          height={sizes.base * 6}
          white
          shadow>
          <TextInput
            placeholder="Tên danh mục"
            onChangeText={onChangeName}
            onBlur={(e) => onChangeName(e.nativeEvent.text)}
            value={name}
            returnKeyType="next"
            style={styles.textInput}
            allowFontScaling={false}
            placeholderTextColor={colors.black}
          />
        </Div>
        <Text medium header>
          Mô tả:
        </Text>
        <Div
          mt={sizes.base}
          radius={sizes.radius * 2}
          pl={sizes.base}
          height={sizes.base * 15}
          white
          shadow>
          <TextInput
            placeholder="Mô tả"
            onChangeText={onChangeDescription}
            onBlur={(e) => onChangeDescription(e.nativeEvent.text)}
            value={description}
            multiline
            style={styles.textInput}
            allowFontScaling={false}
            placeholderTextColor={colors.black}
          />
        </Div>
      </Div>
      <Div>
        <Div margin={[0, sizes.base * 4, BOTTOM_SPACE]} shadow>
          <TouchableOpacity onPress={onUpdate}>
            <Div orange padding={sizes.base * 2} radius={sizes.radius * 2} center middle>
              <Text bold header white>
                Xong
              </Text>
            </Div>
          </TouchableOpacity>
        </Div>
      </Div>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  textInput: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    fontFamily: fonts.robotoRegular,
    color: colors.black,
  },
});

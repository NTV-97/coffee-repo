import { Alert, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BOTTOM_SPACE, SCREEN_NAME } from 'config/constants';
import { RootStackParamList } from '@navigator/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useGetProductQuery, useUpdateProductMutation } from 'graphql-hook';
import { Container, Div, Text } from 'config/components';
import { colors, sizes } from 'config/theme';
import { navigationUtils } from 'config/utils';
import { fonts } from '../../assets';
import { ModalAdd } from './components/ModalAdd';
import { launchImageLibrary } from 'react-native-image-picker';

const { UPDATE_PRODUCT } = SCREEN_NAME;

export const UpdateProduct: React.FC<
  NativeStackScreenProps<RootStackParamList, typeof UPDATE_PRODUCT>
> = ({ route }) => {
  const { data, refetch } = useGetProductQuery({ variables: { id: route.params.idProduct } });
  const product = data?.getProduct;
  const [update] = useUpdateProductMutation({
    onCompleted: (_data) => {
      if (_data) {
        refetch();
        navigationUtils.goBack();
      }
    },
  });

  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product?.price ?? 0);
  const [image, setImage] = useState('');
  const [productSizes, setProductSizes] = useState<{ name: string; price: number }[]>([]);
  const [productToppings, setProductToppings] = useState<{ name: string; price: number }[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAddSize, setIsAddSize] = useState(true);

  const onUpdate = () => {
    update({
      variables: {
        id: route.params.idProduct,
        product: {
          category: product?.category.id ?? '',
          name,
          price,
          description,
          image,
          details: {
            size: productSizes,
            topping: productToppings,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (product?.details?.size?.length) {
      const _sizes = product.details.size.map((e) => {
        return {
          name: e?.name ?? '',
          price: e?.price ?? 0,
        };
      });
      setProductSizes(_sizes);
    }
    if (product?.details?.topping?.length) {
      const _toppings = product.details.topping.map((e) => {
        return {
          name: e?.name ?? '',
          price: e?.price ?? 0,
        };
      });
      setProductToppings(_toppings);
    }
    if (product) {
      setName(product.name);
      setDescription(product.description ?? '');
      setPrice(product.price);
      setImage(product.image ?? '');
    }
  }, [product]);

  const onChangeProductSize = (type: 'price' | 'name' | 'delete', text: string, index: number) => {
    let _productSizes = JSON.parse(JSON.stringify(productSizes));
    if (type === 'name') {
      _productSizes[index].name = text;
    } else if (type === 'price') {
      _productSizes[index].price = isNaN(Number(text)) ? 0 : Number(text);
    } else {
      _productSizes.splice(index, 1);
    }
    setProductSizes(_productSizes);
  };
  const onChangeProductTopping = (
    type: 'price' | 'name' | 'delete',
    text: string,
    index: number,
  ) => {
    let _productToppings = JSON.parse(JSON.stringify(productToppings));
    if (type === 'name') {
      _productToppings[index].name = text;
    } else if (type === 'price') {
      _productToppings[index].price = Number(text);
    } else {
      _productToppings.splice(index, 1);
    }
    setProductToppings(_productToppings);
  };

  const onAddDetail = (props: { name: string; price: number }) => {
    if (isAddSize) {
      setProductSizes([...productSizes, props]);
    } else {
      setProductToppings([...productToppings, props]);
    }
    setIsVisible(false);
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

  return (
    <Container backgroundColor={colors.brown}>
      <Div padding={[sizes.base, sizes.base * 2]} row center>
        <Div flex={1} center>
          <Text title bold white>
            Chỉnh sửa sản phẩm
          </Text>
        </Div>
        <TouchableOpacity onPress={() => navigationUtils.goBack()}>
          <Icon name="close" size={sizes.base * 4} color={colors.white} />
        </TouchableOpacity>
      </Div>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div center mt={sizes.base * 2}>
          <Div width={150} height={150}>
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
              onChangeText={setName}
              onBlur={(e) => setName(e.nativeEvent.text)}
              value={name}
              returnKeyType="next"
              style={styles.textInput}
              allowFontScaling={false}
              placeholderTextColor={colors.black}
            />
          </Div>
          <Text medium header>
            Giá:
          </Text>
          <Div
            mt={sizes.base}
            mb={sizes.base * 2}
            radius={sizes.radius * 2}
            pl={sizes.base}
            height={sizes.base * 6}
            white
            row
            center
            shadow>
            <TextInput
              placeholder="0"
              onChangeText={(text) => setPrice(isNaN(Number(text)) ? 0 : Number(text))}
              onBlur={(e) =>
                setPrice(isNaN(Number(e.nativeEvent.text)) ? 0 : Number(e.nativeEvent.text))
              }
              value={price.toString()}
              returnKeyType="next"
              inputMode="numeric"
              style={styles.textInput}
              allowFontScaling={false}
              placeholderTextColor={colors.black}
            />
            <Div>
              <Text>VND</Text>
            </Div>
          </Div>
          <Text medium header>
            Mô tả:
          </Text>
          <Div
            mt={sizes.base}
            radius={sizes.radius * 2}
            pl={sizes.base}
            height={sizes.base * 16}
            white
            shadow>
            <TextInput
              placeholder="Mô tả"
              onChangeText={setDescription}
              onBlur={(e) => setDescription(e.nativeEvent.text)}
              value={description}
              style={styles.textInput}
              allowFontScaling={false}
              placeholderTextColor={colors.black}
              multiline
            />
          </Div>
          <Div mt={sizes.base * 2}>
            <Div row center>
              <Text medium header>
                Size:
              </Text>
              <Div flex={1}>
                <TouchableOpacity
                  onPress={() => {
                    setIsAddSize(true);
                    setIsVisible(true);
                  }}>
                  <Div right row center>
                    <Text>Thêm size </Text>
                    <Div borderWidth={1} borderColor={colors.blue} radius={sizes.radius} white>
                      <Icon name="add" size={sizes.base * 3} color={colors.blue} />
                    </Div>
                  </Div>
                </TouchableOpacity>
              </Div>
            </Div>
            <Div>
              {productSizes.length
                ? productSizes.map((e, index) => (
                    <Div
                      padding={sizes.base}
                      mt={sizes.base}
                      white
                      radius={sizes.radius}
                      key={index}>
                      <Div row center>
                        <Text>Tên: </Text>
                        <Div
                          borderWidth={1}
                          height={sizes.base * 4}
                          width={'90%'}
                          borderColor={colors.borderGray}
                          padding={sizes.base}
                          radius={sizes.radius}>
                          <TextInput
                            placeholder="Tên size"
                            onChangeText={(text) => onChangeProductSize('name', text, index)}
                            onBlur={(_e) => onChangeProductSize('name', _e.nativeEvent.text, index)}
                            value={productSizes[index]?.name ?? ''}
                            style={styles.textInput}
                            allowFontScaling={false}
                            placeholderTextColor={colors.black}
                          />
                        </Div>
                      </Div>
                      <Div mt={sizes.base} center row>
                        <Text>Giá: </Text>
                        <Div
                          borderWidth={1}
                          height={sizes.base * 4}
                          width={'90%'}
                          row
                          center
                          borderColor={colors.borderGray}
                          padding={sizes.base}
                          radius={sizes.radius}>
                          <TextInput
                            placeholder="Giá"
                            onChangeText={(text) => onChangeProductSize('price', text, index)}
                            onBlur={(_e) =>
                              onChangeProductSize('price', _e.nativeEvent.text, index)
                            }
                            value={productSizes[index]?.price.toString() ?? ''}
                            style={styles.textInput}
                            allowFontScaling={false}
                            inputMode="numeric"
                            placeholderTextColor={colors.black}
                          />
                          <Div>
                            <Text>VND</Text>
                          </Div>
                        </Div>
                      </Div>
                      <Div mt={sizes.base} alignRight>
                        <Div pink mr={sizes.base} radius={sizes.radius} padding={sizes.base / 2}>
                          <TouchableOpacity
                            onPress={() => onChangeProductSize('delete', '', index)}>
                            <Div row center>
                              <Text white>Xoá size</Text>
                              <Icon name="delete" size={sizes.base * 3} color={colors.white} />
                            </Div>
                          </TouchableOpacity>
                        </Div>
                      </Div>
                    </Div>
                  ))
                : null}
            </Div>
          </Div>
          <Div mt={sizes.base * 2}>
            <Div row center>
              <Text medium header>
                Toppings:
              </Text>
              <Div flex={1}>
                <TouchableOpacity
                  onPress={() => {
                    setIsAddSize(false);
                    setIsVisible(true);
                  }}>
                  <Div right row center>
                    <Text>Thêm topping </Text>
                    <Div borderWidth={1} borderColor={colors.blue} radius={sizes.radius} white>
                      <Icon name="add" size={sizes.base * 3} color={colors.blue} />
                    </Div>
                  </Div>
                </TouchableOpacity>
              </Div>
            </Div>
            <Div>
              {productToppings.length
                ? productToppings.map((e, index) => (
                    <Div
                      padding={sizes.base}
                      mt={sizes.base}
                      white
                      radius={sizes.radius}
                      key={index}>
                      <Div row center>
                        <Text>Tên: </Text>
                        <Div
                          borderWidth={1}
                          height={sizes.base * 4}
                          width={'90%'}
                          borderColor={colors.borderGray}
                          padding={sizes.base}
                          radius={sizes.radius}>
                          <TextInput
                            placeholder="Tên size"
                            onChangeText={(text) => onChangeProductTopping('name', text, index)}
                            onBlur={(_e) =>
                              onChangeProductTopping('name', _e.nativeEvent.text, index)
                            }
                            value={productToppings[index]?.name ?? ''}
                            style={styles.textInput}
                            allowFontScaling={false}
                            placeholderTextColor={colors.black}
                          />
                        </Div>
                      </Div>
                      <Div mt={sizes.base} center row>
                        <Text>Giá: </Text>
                        <Div
                          borderWidth={1}
                          height={sizes.base * 4}
                          width={'90%'}
                          center
                          row
                          borderColor={colors.borderGray}
                          padding={sizes.base}
                          radius={sizes.radius}>
                          <TextInput
                            placeholder="Giá"
                            onChangeText={(text) => onChangeProductTopping('price', text, index)}
                            onBlur={(_e) =>
                              onChangeProductTopping('price', _e.nativeEvent.text, index)
                            }
                            value={productToppings[index]?.price.toString() ?? ''}
                            style={styles.textInput}
                            allowFontScaling={false}
                            inputMode="numeric"
                            placeholderTextColor={colors.black}
                          />
                          <Div>
                            <Text>VND</Text>
                          </Div>
                        </Div>
                      </Div>
                      <Div mt={sizes.base} alignRight>
                        <Div pink mr={sizes.base} radius={sizes.radius} padding={sizes.base / 2}>
                          <TouchableOpacity
                            onPress={() => onChangeProductTopping('delete', '', index)}>
                            <Div row center>
                              <Text white>Xoá size</Text>
                              <Icon name="delete" size={sizes.base * 3} color={colors.white} />
                            </Div>
                          </TouchableOpacity>
                        </Div>
                      </Div>
                    </Div>
                  ))
                : null}
            </Div>
          </Div>
        </Div>
      </ScrollView>
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
      <ModalAdd
        isVisible={isVisible}
        onSubmit={onAddDetail}
        onclose={() => setIsVisible(false)}
        title={isAddSize ? 'Thêm size' : 'Thêm topping'}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textInput: {
    width: '88%',
    height: '100%',
    alignItems: 'center',
    fontFamily: fonts.robotoRegular,
    color: colors.black,
  },
});

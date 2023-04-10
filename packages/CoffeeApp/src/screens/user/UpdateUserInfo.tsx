import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Container, Div, Divider, Text } from 'config/components';
import { colors, sizes } from 'config/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigator/types';
import { SCREEN_NAME } from 'config/constants';
import { navigationUtils } from 'config/utils';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import { fonts } from '../../assets';
import * as yup from 'yup';
import { useGetUserQuery } from 'graphql-hook';
import { useEditUserMutation } from 'graphql-hook';
import { EditUserMutation } from 'graphql-hook';
import { EditUserMutationVariables } from 'graphql-hook';

const { UPDATE_USER_INFO } = SCREEN_NAME;
const removeEmptyObject = (object: any): any => {
  const newObj: any = {};
  //@ts-ignore
  Object.keys(object).forEach((key) => {
    //@ts-ignore
    if (object[key] === Object(object[key])) {
      newObj[key] = removeEmptyObject(object[key]);
    }
    //@ts-ignore
    else if (object[key] !== undefined) {
      newObj[key] = object[key];
    }
  });
  return newObj;
};

const validateEmail = (email: string | undefined) => {
  return yup.string().email().isValidSync(email);
};

const validatePhone = (phone: number | undefined) => {
  return yup
    .number()
    .integer()
    .positive()
    .test((phone) => {
      return phone && phone.toString().length >= 9 && phone.toString().length <= 12 ? true : false;
    })
    .isValidSync(phone);
};

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .test('email', 'Email không đúng', (value) => validateEmail(value)),
  phoneNumber: yup
    .number()
    .integer()
    .positive()
    .required('Vui lòng nhập số điện thoại')
    .test('phone', 'Số điện thoại không đúng', (value) => validatePhone(value ?? 0)),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
  name: yup.string().required('Vui lòng nhập họ và tên'),
});

export const UpdateUserInfo: React.FC<
  NativeStackScreenProps<RootStackParamList, typeof UPDATE_USER_INFO>
> = () => {
  const { data, refetch } = useGetUserQuery();
  const [editUser] = useEditUserMutation({
    onCompleted: () => {
      refetch();
      navigationUtils.goBack();
    },
  });
  const user = data?.getUser;
  const variablesUpdate: EditUserMutationVariables = {
    email: user?.email ?? '',
    phoneNumber: user?.phoneNumber ?? '',
    address: user?.address ?? '',
    name: user?.name ?? '',
    id: user?.id ?? '',
  };
  const onSubmitUpdate = (_variables: EditUserMutationVariables) => {
    let variables = _variables;
    if (_variables.email === user?.email) {
      variables.email = undefined;
    }
    if (_variables.phoneNumber === user?.phoneNumber) {
      variables.phoneNumber = undefined;
    }
    editUser({ variables: removeEmptyObject(variables) });
  };
  return (
    <Container backgroundColor={colors.brown}>
      <Div padding={[sizes.base, sizes.base * 2]} row center>
        <Div flex={1} center>
          <Text title bold>
            Sửa thông tin cá nhân
          </Text>
        </Div>
        <TouchableOpacity onPress={() => navigationUtils.goBack()}>
          <Icon name="close" size={sizes.base * 4} color={colors.black} />
        </TouchableOpacity>
      </Div>
      <Divider color={colors.black} mt={sizes.base} />
      <Div flex={1} mt={sizes.base * 2}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={variablesUpdate}
          validateOnBlur
          onSubmit={onSubmitUpdate}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <Div flex={1} margin={[0, sizes.base * 2]}>
              <Div>
                <Div
                  mt={sizes.base}
                  radius={sizes.radius * 2}
                  pl={sizes.base}
                  height={sizes.base * 6}
                  backgroundColor={colors.green}
                  shadow>
                  <TextInput
                    placeholder="Số điện thoại"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber ?? ''}
                    returnKeyType="next"
                    autoCapitalize="none"
                    keyboardType="numeric"
                    style={styles.textInput}
                    allowFontScaling={false}
                    placeholderTextColor={colors.black}
                  />
                </Div>
                <Div mt={sizes.base / 2}>
                  <Text caption italic pink medium>
                    {errors.phoneNumber && errors.phoneNumber}
                  </Text>
                </Div>
              </Div>
              <Div>
                <Div
                  mt={sizes.base}
                  radius={sizes.radius * 2}
                  pl={sizes.base}
                  height={sizes.base * 6}
                  backgroundColor={colors.green}
                  shadow>
                  <TextInput
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email ?? ''}
                    returnKeyType="next"
                    autoCapitalize="none"
                    style={styles.textInput}
                    allowFontScaling={false}
                    placeholderTextColor={colors.black}
                  />
                </Div>
                <Div mt={sizes.base / 2}>
                  <Text caption italic pink medium>
                    {errors.email && errors.email}
                  </Text>
                </Div>
              </Div>
              <Div>
                <Div
                  mt={sizes.base}
                  radius={sizes.radius * 2}
                  pl={sizes.base}
                  height={sizes.base * 6}
                  backgroundColor={colors.green}
                  shadow>
                  <TextInput
                    placeholder="Họ và tên"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name ?? ''}
                    returnKeyType="next"
                    style={styles.textInput}
                    allowFontScaling={false}
                    placeholderTextColor={colors.black}
                  />
                </Div>
                <Div mt={sizes.base / 2}>
                  <Text caption italic pink medium>
                    {errors.name && errors.name}
                  </Text>
                </Div>
              </Div>
              <Div>
                <Div
                  mt={sizes.base}
                  radius={sizes.radius * 2}
                  pl={sizes.base}
                  height={sizes.base * 6}
                  backgroundColor={colors.green}
                  shadow>
                  <TextInput
                    placeholder="Địa chỉ"
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address ?? ''}
                    returnKeyType="done"
                    // @ts-ignore
                    onSubmitEditing={handleSubmit}
                    style={styles.textInput}
                    allowFontScaling={false}
                    placeholderTextColor={colors.black}
                  />
                </Div>
                <Div mt={sizes.base / 2}>
                  <Text caption italic pink medium>
                    {errors.address && errors.address}
                  </Text>
                </Div>
              </Div>
              {/* @ts-ignore */}
              <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                <Div
                  pink
                  padding={sizes.base}
                  radius={sizes.radius * 4}
                  center
                  middle
                  centerSelf
                  height={sizes.base * 5}
                  width={sizes.base * 20}
                  mt={sizes.base}>
                  <Text header white semibold>
                    Hoàn tất
                  </Text>
                </Div>
              </TouchableOpacity>
            </Div>
          )}
        </Formik>
      </Div>
    </Container>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    fontFamily: fonts.robotoRegular,
    color: colors.black,
  },
});

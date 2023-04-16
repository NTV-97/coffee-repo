// eslint-disable @typescript-eslint/no-shadow
import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { DEVICE } from 'config/constants';
import * as yup from 'yup';
import { fonts, images } from '../../assets';
import { Formik } from 'formik';
import { sizes, colors } from 'config/theme';
import { AppLoading, Div, Text } from 'config/components';
import { UserRole, useSignupMutation } from 'graphql-hook';
import { SignupMutationVariables } from 'graphql-hook';
import { Context } from 'config/context';
import { storage } from 'config/utils';

const { WINDOW_WIDTH, WINDOW_HEIGHT, SCREEN_WIDTH } = DEVICE;
const { setItem } = storage;

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
  password: yup
    .string()
    .min(8, ({ min }) => `Mật khẩu phải có ít nhất ${min} ký tự`)
    .required('Vui lòng nhập mật khẩu'),
  phoneNumber: yup
    .number()
    .integer()
    .positive()
    .required('Vui lòng nhập số điện thoại')
    .test('phone', 'Số điện thoại không đúng', (value) => validatePhone(value ?? 0)),
  confirmPwd: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .oneOf([yup.ref('password'), null], 'Mật khẩu không giống nhau'),
  address: yup.string(),
  name: yup.string(),
});

type VariablesSignUpType = {
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  name: string;
  confirmPwd: string;
};

export const SignUpScreen: React.FC = () => {
  const [signUp, { loading }] = useSignupMutation({
    onCompleted(data) {
      if (data.signup.message === 'success' && data.signup.token?.length) {
        onLoginCompleted(data.signup.token);
      } else {
        Alert.alert(data.signup.message);
      }
    },
    onError(error) {
      Alert.alert(error.message);
    },
  });

  const variablesSignUp = {
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
    name: '',
    confirmPwd: '',
  };
  const { setToken } = useContext(Context);

  const onLoginCompleted = (token: string) => {
    setItem('token', token);
    setToken(token);
  };

  const onSubmitSignUp = (_variables: VariablesSignUpType) => {
    const variables: SignupMutationVariables = {
      registerInput: {
        email: _variables.email,
        phoneNumber: _variables.phoneNumber,
        password: _variables.password,
        address: _variables.address,
        name: _variables.name,
        role: UserRole.User,
      },
    };
    signUp({ variables });
  };

  return (
    <Div backgroundColor={colors.darkOpacity} flex={1}>
      <Div width={SCREEN_WIDTH} height={WINDOW_HEIGHT / 2} overflow="hidden" flex={1}>
        <Image source={images.register} />
      </Div>
      <Div flex={1} white>
        <Div center margin={[sizes.base, 0]}>
          <Text title semibold black>
            Đăng ký tài khoản
          </Text>
        </Div>
        <Div flex={1}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={variablesSignUp}
            validateOnBlur
            onSubmit={onSubmitSignUp}>
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
                      value={values.phoneNumber}
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
                      value={values.email}
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
                      placeholder="Mật khẩu"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                      returnKeyType="next"
                      style={styles.textInput}
                      allowFontScaling={false}
                      placeholderTextColor={colors.black}
                    />
                  </Div>
                  <Div mt={sizes.base / 2}>
                    <Text caption italic pink medium>
                      {errors.password && errors.password}
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
                      placeholder="Nhập lại mật khẩu"
                      onChangeText={handleChange('confirmPwd')}
                      onBlur={handleBlur('confirmPwd')}
                      value={values.confirmPwd}
                      secureTextEntry
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
                      {errors.confirmPwd && errors.confirmPwd}
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
                      Đăng ký
                    </Text>
                  </Div>
                </TouchableOpacity>
              </Div>
            )}
          </Formik>
        </Div>
      </Div>
      {loading && <AppLoading />}
    </Div>
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

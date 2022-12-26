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
import { useSignupMutation } from 'graphql-hook';
import { SignupMutationVariables } from 'graphql-hook';
import { useLoginMutation } from 'graphql-hook';
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
});

type VariablesSignUpType = {
  phoneNumber: string;
  email: string;
  password: string;
  confirmPwd: string;
};

export const SignUpScreen: React.FC = () => {
  const [signUp, { loading }] = useSignupMutation({
    onCompleted(data) {
      if (data.signup.success) {
        onSignUpCompleted();
      } else {
        Alert.alert(data.signup.message);
      }
    },
    onError(error) {
      Alert.alert(error.message);
    },
  });
  const [login] = useLoginMutation({
    onCompleted(data) {
      if (data.login.token?.length) {
        onLoginCompleted(data.login.token);
      } else {
        Alert.alert(data.login.message);
      }
    },
    onError(error) {
      Alert.alert(error.message);
    },
  });

  const _variablesSignUp = {
    phoneNumber: '',
    email: '',
    password: '',
    confirmPwd: '',
  };
  const { setToken } = useContext(Context);

  const [variablesSignUp, setVariablesSignUp] = useState<SignupMutationVariables>({
    email: '',
    password: '',
    phoneNumber: '',
    type: 'admin',
  });

  const onLoginCompleted = (token: string) => {
    setItem('token', token);
    setToken(token);
  };

  const onSignUpCompleted = () => {
    login({
      variables: {
        email: variablesSignUp.email,
        password: variablesSignUp.password,
        phoneNumber: variablesSignUp.phoneNumber,
      },
    });
  };

  const onSubmitSignUp = (variables: VariablesSignUpType) => {
    const _variables: SignupMutationVariables = {
      email: variables.email,
      phoneNumber: variables.phoneNumber,
      password: variables.password,
      type: 'admin',
    };
    setVariablesSignUp(_variables);
    signUp({ variables: _variables });
  };

  return (
    <Div backgroundColor={colors.darkOpacity} flex={1}>
      <Div
        width={SCREEN_WIDTH}
        height={WINDOW_HEIGHT / 2}
        overflow="hidden"
        flex={1}
        style={styles.bottomRadius}>
        <Image source={images.banner} />
      </Div>
      <Div mt={sizes.base * 2} flex={1}>
        <Div flex={1}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={_variablesSignUp}
            validateOnBlur
            onSubmit={onSubmitSignUp}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
              <Div flex={1} margin={[0, sizes.base * 2]}>
                <Div>
                  <Div
                    mt={sizes.base}
                    borderWidth={1}
                    radius={sizes.radius}
                    pl={sizes.base}
                    height={sizes.base * 5}
                    backgroundColor={colors.white}>
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
                      placeholderTextColor={colors.borderGray}
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
                    borderWidth={1}
                    radius={sizes.radius}
                    pl={sizes.base}
                    height={sizes.base * 5}
                    backgroundColor={colors.white}>
                    <TextInput
                      placeholder="Email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      returnKeyType="next"
                      autoCapitalize="none"
                      style={styles.textInput}
                      allowFontScaling={false}
                      placeholderTextColor={colors.borderGray}
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
                    borderWidth={1}
                    radius={sizes.radius}
                    pl={sizes.base}
                    height={sizes.base * 5}
                    backgroundColor={colors.white}>
                    <TextInput
                      placeholder="Password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                      returnKeyType="next"
                      style={styles.textInput}
                      allowFontScaling={false}
                      placeholderTextColor={colors.borderGray}
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
                    borderWidth={1}
                    radius={sizes.radius}
                    pl={sizes.base}
                    height={sizes.base * 5}
                    backgroundColor={colors.white}>
                    <TextInput
                      placeholder="Confirm password"
                      onChangeText={handleChange('confirmPwd')}
                      onBlur={handleBlur('confirmPwd')}
                      value={values.confirmPwd}
                      secureTextEntry
                      returnKeyType="done"
                      // @ts-ignore
                      onSubmitEditing={handleSubmit}
                      style={styles.textInput}
                      allowFontScaling={false}
                      placeholderTextColor={colors.borderGray}
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
                    black
                    padding={sizes.base}
                    radius={sizes.radius * 4}
                    center
                    middle
                    centerSelf
                    height={sizes.base * 5}
                    width={sizes.base * 20}
                    mt={sizes.base * 2}>
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
  bottomRadius: {
    borderBottomLeftRadius: sizes.radius * 7,
    borderBottomRightRadius: sizes.radius * 7,
  },
  textInput: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    fontFamily: fonts.robotoRegular,
    color: colors.black,
  },
});

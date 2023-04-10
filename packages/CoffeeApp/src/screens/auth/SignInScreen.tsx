import React, { useContext } from 'react';
import { Alert, ImageBackground, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { fonts, images } from '../../assets';
import { SCREEN_NAME, DEVICE } from 'config/constants';
import { Div, Text, AppLoading } from 'config/components';
import { sizes, colors } from 'config/theme';
import { navigationUtils } from 'config/utils';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useLoginMutation } from 'graphql-hook';
import { storage } from 'config/utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigator/types';
import { Context } from 'config/context';

const { WINDOW_HEIGHT, SCREEN_WIDTH, WINDOW_WIDTH } = DEVICE;
const { SIGN_IN, SIGN_UP } = SCREEN_NAME;
const { navigate } = navigationUtils;
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
    .required('Vui lòng nhập email / số điện thoại')
    .test('email_or_phone', 'Email / Phone không đúng', (value) => {
      return validateEmail(value) || validatePhone(parseInt(value ?? '0'));
    }),
  password: yup
    .string()
    .min(8, ({ min }) => `Mật khẩu phải có ít nhất ${min} ký tự`)
    .required('Vui lòng nhập mật khẩu'),
});

export const SignInScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, typeof SIGN_IN>
> = () => {
  const { setToken } = useContext(Context);
  const variablesLogin = {
    email: '',
    password: '',
  };

  const onLoginCompleted = (token: string) => {
    setItem('token', token);
    setToken(token);
  };

  const [login, { loading }] = useLoginMutation({
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

  const isNumeric = (value: string) => {
    return /^\d+$/.test(value);
  };

  const onSubmitLogin = (variables: { email: string; password: string }) => {
    const { email, password } = variables;
    if (isNumeric(email)) {
      login({
        variables: {
          phoneNumber: email,
          password,
        },
      });
    } else {
      login({ variables });
    }
  };

  return (
    <Div backgroundColor={colors.brown}>
      <ImageBackground source={images.backgroundLogin} style={styles.imageBackground}>
        <Div flex={1} middle>
          <Div flex={0.4} />
          <Div center>
            <Text medium white h2>
              {'Đăng nhập'.toUpperCase()}
            </Text>
          </Div>
          <Div flex={1}>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={variablesLogin}
              validateOnBlur
              onSubmit={onSubmitLogin}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                <Div flex={1} margin={[sizes.base, sizes.base * 2]}>
                  <Div>
                    <Div
                      mt={sizes.base}
                      radius={sizes.radius * 3}
                      pl={sizes.base}
                      height={sizes.base * 6}
                      shadow
                      backgroundColor={colors.brownOpacity}>
                      <TextInput
                        placeholder="Số điện thoại / Email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        returnKeyType="next"
                        autoCapitalize="none"
                        style={styles.textInput}
                        allowFontScaling={false}
                        placeholderTextColor={colors.white}
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
                      radius={sizes.radius * 3}
                      pl={sizes.base}
                      height={sizes.base * 6}
                      shadow
                      backgroundColor={colors.brownOpacity}>
                      <TextInput
                        placeholder="Mật khẩu"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                        returnKeyType="done"
                        // @ts-ignore
                        onSubmitEditing={handleSubmit}
                        style={styles.textInput}
                        allowFontScaling={false}
                        placeholderTextColor={colors.white}
                      />
                    </Div>
                    <Div mt={sizes.base / 2}>
                      <Text caption italic pink medium>
                        {errors.password && errors.password}
                      </Text>
                    </Div>
                  </Div>
                  <Div row space="between">
                    <Div flex={1} />
                    <Div mr={sizes.base * 2}>
                      <TouchableOpacity>
                        <Text white>Quên mật khẩu</Text>
                      </TouchableOpacity>
                    </Div>
                  </Div>
                  {/* @ts-ignore */}
                  <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                    <Div
                      backgroundColor={colors.lightOrange}
                      padding={sizes.base}
                      radius={sizes.radius * 4}
                      center
                      middle
                      centerSelf
                      shadow
                      height={sizes.base * 5}
                      width={sizes.base * 20}
                      mt={sizes.base * 4}>
                      <Text title black semibold>
                        Đăng nhập
                      </Text>
                    </Div>
                  </TouchableOpacity>
                </Div>
              )}
            </Formik>
          </Div>
        </Div>
        {loading && <AppLoading />}
      </ImageBackground>
    </Div>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  textInput: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    fontFamily: fonts.robotoRegular,
    color: colors.white,
    fontSize: sizes.header,
  },
});

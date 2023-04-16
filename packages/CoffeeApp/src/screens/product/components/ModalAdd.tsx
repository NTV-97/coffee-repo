import { Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Div, Text } from 'config/components';
import { colors, sizes } from 'config/theme';
import { fonts } from '../../../assets';

interface IPropsModalAdd {
  isVisible: boolean;
  title: string;
  onclose: () => void;
  onSubmit: ({ name, price }: { name: string; price: number }) => void;
}

export const ModalAdd: React.FC<IPropsModalAdd> = ({ isVisible, title, onclose, onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  return (
    <Div center middle flex={1}>
      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onclose}>
        <Div flex={1} center middle>
          <Div white radius={sizes.radius * 2} shadow padding={sizes.base * 2} margin={sizes.base}>
            <Div center>
              <Text title bold>
                {title}
              </Text>
            </Div>
            <Div>
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
                  placeholder="Tên size"
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
            </Div>
            <Div mt={sizes.base}>
              <TouchableOpacity onPress={() => onSubmit({ name, price })}>
                <Div blue padding={sizes.base * 1.5} center middle radius={sizes.radius}>
                  <Text bold header white>
                    Thêm
                  </Text>
                </Div>
              </TouchableOpacity>
            </Div>
          </Div>
        </Div>
      </Modal>
    </Div>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '88%',
    height: '100%',
    alignItems: 'center',
    fontFamily: fonts.robotoRegular,
    color: colors.black,
  },
});

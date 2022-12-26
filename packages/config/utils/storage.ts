import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';

export const getItem = async (key: string): Promise<string> => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ?? '';
  } catch (error) {
    return '';
  }
};

export const setItem = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const removeItem = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    throw new Error('Remove storage item failed');
  }
};

export const multiGet = async (arr: string[]): Promise<void | readonly KeyValuePair[]> => {
  try {
    const multiItem = await AsyncStorage.multiGet(arr);
    return multiItem;
  } catch (error) {
    return [];
  }
};

export const getAllKeys = async (): Promise<readonly string[]> => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    return [];
  }
};

export const multiSet = async (keyValue: [string, string][]): Promise<boolean> => {
  try {
    await AsyncStorage.multiSet(keyValue);
    return true;
  } catch (error) {
    return false;
  }
};

export const multiRemove = async (keys: string[]): Promise<boolean> => {
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    return false;
  }
};

export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch {
    throw new Error('Clear storage failed');
  }
};

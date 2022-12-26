import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
export declare const getItem: (key: string) => Promise<string>;
export declare const setItem: (key: string, value: string) => Promise<boolean>;
export declare const removeItem: (key: string) => Promise<boolean>;
export declare const multiGet: (arr: string[]) => Promise<void | readonly KeyValuePair[]>;
export declare const getAllKeys: () => Promise<readonly string[]>;
export declare const multiSet: (keyValue: [string, string][]) => Promise<boolean>;
export declare const multiRemove: (keys: string[]) => Promise<boolean>;
export declare const clear: () => Promise<void>;

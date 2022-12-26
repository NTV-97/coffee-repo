import { State } from './type';

export const initialState: State = {
  token: '',
};

export const defaultContext = {
  state: initialState,
  setToken: (_token: string) => null,
};

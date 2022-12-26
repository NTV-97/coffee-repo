import { Action, State } from './type';
export declare const useActions: (
  dispatch: (value: Action) => void,
  state: State,
) => {
  setToken: (_token: string) => void;
};

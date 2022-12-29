export declare const SET_TOKEN = 'SET_TOKEN';
export type Action = {
  type: string;
  data: any;
};
export type ContextType = {
  setToken: (token: string) => void;
  state: State;
};
export type State = {
  token: string;
};

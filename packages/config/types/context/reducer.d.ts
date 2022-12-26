import { State, Action } from './type';
export declare const useReducerContext: (initialState: State) => {
  reducer: (prevState: State, action: Action) => State;
};

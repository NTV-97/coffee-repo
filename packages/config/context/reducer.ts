import { State, Action, SET_TOKEN } from './type';

export const useReducerContext = (initialState: State) => {
  const reducer = (prevState: State, action: Action): State => {
    switch (action.type) {
      case SET_TOKEN:
        return {
          ...prevState,
          token: action.data,
        };

      default:
        return initialState;
    }
  };
  return { reducer };
};

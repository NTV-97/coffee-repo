import { SET_TOKEN, Action, State } from './type';

export const useActions = (dispatch: (value: Action) => void, state: State) => {
  const { token } = state;
  const setToken = (_token: string) => {
    dispatch({
      type: SET_TOKEN,
      data: _token,
    });
  };

  return {
    setToken,
  };
};

import { createContext, useEffect, useMemo, useReducer } from 'react';
import { ContextType } from './type';
import { initialState, defaultContext } from './initialAndDefault';
import { useActions } from './actions';
import { useReducerContext } from './reducer';
import { useDeepCompareEffect } from '../utils/hooks';

export const Context = createContext<ContextType>(defaultContext);

const ContextProvider = () => {
  const { reducer } = useReducerContext(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { setToken } = useActions(dispatch, state);

  useEffect(() => {
    return dispatch({ type: '', data: null });
  }, [useDeepCompareEffect(initialState)]);

  // const handleAddPromo = useCallback(
  //   async (promoCode: string) => {
  //     const data = {
  //       promotion_code: promoCode,
  //       amount: state.cart.to_price,
  //       patient_phone_number: session?.user?.phone_number,
  //     };
  //     const formData = parseObjToFormData(data);
  //     const res = await postFormData(API_VERSION + 'promote-code/verify', formData);
  //     if (res?.error?.extra?.invalid_parameters) {
  //       return Alert.alert(res.error.extra.invalid_parameters?.promotion_code);
  //     }
  //     if (res.success === 'OK' && res.data) {
  //       return applyPromoCode(res.data);
  //     }
  //   },
  //   [session, state, API_VERSION, applyPromoCode],
  // );

  const context = useMemo(
    () => ({
      state,
      setToken,
    }),
    [state, setToken],
  );
  return {
    state,
    context,
  };
};

export default ContextProvider;

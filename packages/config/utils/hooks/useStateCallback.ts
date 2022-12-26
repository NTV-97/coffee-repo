/* eslint-disable no-shadow */
import { useReducer, useRef, useCallback, useEffect, Reducer } from 'react';

export function useStateCallback<S>(
  initialState: S,
): [S, (state: Partial<S>, cb?: ((state: S) => void) | undefined) => void] {
  const [state, setState] = useReducer<Reducer<S, Partial<S>>>(
    (state, newState) => ({ ...state, ...newState }),
    initialState,
  );
  const cbRef = useRef<((state: S) => void) | undefined>(undefined); // init mutable ref container for callbacks

  const setStateCallback = useCallback((state: Partial<S>, cb?: (state: S) => void) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(state);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `null` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      //@ts-ignore
      cbRef.current(state);
      cbRef.current = undefined; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}

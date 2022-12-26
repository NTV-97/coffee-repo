export declare function useStateCallback<S>(
  initialState: S,
): [S, (state: Partial<S>, cb?: ((state: S) => void) | undefined) => void];

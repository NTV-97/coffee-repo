import { ContextType } from './type';
export declare const Context: import('react').Context<ContextType>;
declare const ContextProvider: () => {
  state: import('./type').State;
  context: {
    state: import('./type').State;
    setToken: (_token: string) => void;
  };
};
export default ContextProvider;

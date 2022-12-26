import GraphqlProvider from 'graphql-hook';
import ContextProvider, { Context } from 'config/context';
import React from 'react';

import { MainStack } from './navigator';

const App: React.FC = () => {
  const { state, context } = ContextProvider();
  return (
    <Context.Provider value={context}>
      <GraphqlProvider>
        <MainStack />
      </GraphqlProvider>
    </Context.Provider>
  );
};

export default App;

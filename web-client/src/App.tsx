import { enableAllPlugins } from 'immer';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import SEO from 'src/components/SEO/SEO';

import MasterPage from './pages/MasterPage';
import configureStore from './store';
import { enableLogger } from './telemetry';

// Later we can check if we need all immer plugins
enableAllPlugins();
enableLogger();

const App = (): ReactElement => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <SEO />
      <MasterPage />
    </Provider>
  );
};

export default App;

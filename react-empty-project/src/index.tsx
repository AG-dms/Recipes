import React from 'react';
import ReactDOM from 'react-dom/client';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from '@app/App';

import './styles/styles.scss';
import './i18n/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <App />,
  // <Provider store={store}>
  //   <PersistGate persistor={persistor}>
  //   </PersistGate>
  // </Provider>,
);

/**
 * index.tsx
 *
 * Description:
 *    Renderer process file for ELectron. This file on compilation will be
 *    attached to `index.html`.
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './State';
import './style.scss';
import { MemoryRouter as Router } from 'react-router-dom';

render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById(`root`)
);

// For HMR Webpack Plugin.
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

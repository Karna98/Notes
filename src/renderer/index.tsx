/**
 * index.tsx
 *
 * Description:
 *    Renderer process file for ELectron. This file on compilation will be
 *    attached to `index.html`.
 */

import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import App from './App';
import { store } from './State';
import './style.scss';

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById(`root`)
);

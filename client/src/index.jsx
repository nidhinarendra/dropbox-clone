import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import './index.css';
import { store } from './_helpers';
import { App } from './App';
import image1 from './dropbox.jpg';

render(
  <Provider store={store} history={history}>
    <App />
  </Provider>,
  document.getElementById('app')
);

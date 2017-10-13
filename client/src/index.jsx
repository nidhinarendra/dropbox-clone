import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './_helpers';
import { App } from './App';
import image1 from './dropbox.jpg';

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

render(
  <div>
    <div id="left-title">
      <img src={image1} />
      DropBox
    </div>
    <div id="loginpage">
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  </div>,
  document.getElementById('app')
);

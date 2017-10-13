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
    <div className="col-md-3">
      <img
        id="homepageimage"
        src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo@2x-vflh_wJFN.png"
        data-hi-res="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo@2x-vflh_wJFN.png"
      />
    </div>
    <div className="col-md-9">
      <div id="loginpage">
        <Provider store={store}>
          <App />
        </Provider>
      </div>
    </div>
  </div>,
  document.getElementById('app')
);

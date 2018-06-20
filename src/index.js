//import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import axios from "axios";

import { AppContainer } from 'react-hot-loader';
import reducers from "./reducers";
import thunk from "./middleware/createThunkMiddleware";

import MakeMainRoutes  from './routes';

//const routes = makeMainRoutes();

// bring in style sheets
require('../style/base.less');




// set up redux with thunk middleware to handle promises and give access to dispatch function
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// set up some sort of environment check
const environmentCheck = "testing";


//Check environment - redux dev tools will be available in testing environments in the browser

const store  = (environmentCheck === 'production') ?
  createStoreWithMiddleware(reducers) : createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension());

// Provider gives all nested components access to redux store
function renderApp(){
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <MakeMainRoutes/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp();
// allow hot reloading in development mode
if (module.hot) {
    module.hot.accept(() => {
        renderApp();
    });
}

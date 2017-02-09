import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll';

import { setLogger } from '../shared/utils/logs';
import configureStore from './store/configureStore';
import routes from './routes';

// Set our logger to be the browser console.
setLogger(console);

ReactDOM.render(
  <Provider store={configureStore(window.__INITIAL_STATE__)}>
    <Router
      history={browserHistory}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
    />
  </Provider>
, document.getElementById('app'));

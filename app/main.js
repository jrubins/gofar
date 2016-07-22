'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import configureStore from './store/configureStore';
import routes from './routes';

// This app history uses the Browser history and the standard scroll behavior to immitate
// browser behavior with the scroll position when a page transition happens.
const appHistory = useScroll(useRouterHistory(createBrowserHistory))();

ReactDOM.render(
    <Provider store={configureStore(window.__INITIAL_STATE__)}>
        <Router history={appHistory} routes={routes} />
    </Provider>
, document.getElementById('app'));

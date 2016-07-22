'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './../reducers/reducers';

// Create our function to set up the store.
export default function(initialState) {
    return createStore(reducers, initialState, compose(
        // Allows us to use asynchronous actions.
        applyMiddleware(ReduxThunk),

        // Enables the Chrome Redux dev tools extension. It's awesome.
        (typeof window === 'object' &&
            typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f)
    ));
};

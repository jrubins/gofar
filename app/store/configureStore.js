import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import { isDevelopment } from '../utils/environment';

import reducers from '../reducers';

// Create our function to set up the store.
export default function configureStore(initialState) {
  return createStore(reducers, initialState, compose(
    // Allows us to use asynchronous actions.
    applyMiddleware(ReduxThunk),

    // Enables the Chrome Redux dev tools extension. It's awesome.
    (isDevelopment() && typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f)
  ));
}

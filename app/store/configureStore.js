import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import { ENV_DEV } from '../constants/constants';
import reducers from '../reducers';

// Create our function to set up the store.
export default function configureStore(initialState) {
  return createStore(reducers, initialState, compose(
    // Allows us to use asynchronous actions.
    applyMiddleware(ReduxThunk),

    // Enables the Chrome Redux dev tools extension. It's awesome.
    (process.env.NODE_ENV === ENV_DEV && typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f)
  ));
}

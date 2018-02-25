import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import thunk from 'redux-thunk'

import {
  isLocal,
} from '../utils/environment'

import reducers from '../reducers'

/**
 * Creates the redux store.
 *
 * @returns {Object}
 */
export function configureStore() {
  return createStore(reducers, undefined, compose(
    // Allows us to use asynchronous actions.
    applyMiddleware(thunk),

    // Enables the Chrome Redux dev tools extension. It's awesome.
    (isLocal() &&
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f)
  ))
}

// We import all of babel-polyfill here but the babel-preset-env
// "useBuiltIns" option takes care of only including what we need.
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { configureStore } from './store'
import Root from './Root'

const store = configureStore()

/**
 * Renders our React root wrapped with a hot-reloading component (NOTE: That component is a no-op in prod).
 */
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Root
        store={store}
      />
    </AppContainer>,
    document.getElementById('app')
  )
}
render()

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root', () => {
    render()
  })
}

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer, setConfig } from 'react-hot-loader'

import Root from './Root'

// Currently an issue with React Hooks and React Hot Loader. This seems to fix the issue.
// See https://github.com/gaearon/react-hot-loader/issues/1088#issuecomment-434862175.
setConfig({ pureSFC: true })

/**
 * Renders our React root wrapped with a hot-reloading component (NOTE: That component is a no-op in prod).
 */
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Root />
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

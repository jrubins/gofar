import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// Import our root SASS file to get built by Webpack.
import './assets/sass/app.scss'

import App from './components/App'

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root

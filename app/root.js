import React from 'react';
import PropTypes from 'prop-types';
import Perf from 'react-addons-perf';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Import our root SASS file to get built by Webpack.
import './assets/sass/app.scss';

import { isDevelopment } from './utils/environment';

import App from './components/app';

// Include React performance add-on when on development.
if (isDevelopment()) {
  window.Perf = Perf;
}

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;

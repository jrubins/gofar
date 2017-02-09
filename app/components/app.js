import React, { PropTypes } from 'react';

import GaScript from './reusable/scripts/ga';

const App = ({ children }) => (
  <div className="app-container">
    <GaScript />

    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;

import React, { PropTypes } from 'react';

import GaScript from './reusable/scripts/ga';
import InspectletScript from './reusable/scripts/inspectlet';

const App = ({ children }) => (
  <div className="app-container">
    <GaScript />
    <InspectletScript />

    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;

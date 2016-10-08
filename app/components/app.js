import React, { PropTypes } from 'react';

const App = ({ children }) => (
  <div className="app-container">
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;

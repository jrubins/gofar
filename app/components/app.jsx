import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from './pages/home';

import GaScript from './reusable/scripts/ga';
import InspectletScript from './reusable/scripts/inspectlet';

const App = () => (
  <div className="app-container">
    <GaScript />
    <InspectletScript />

    <Route
      exact
      path="/"
      component={HomePage}
    />
  </div>
);

export default App;

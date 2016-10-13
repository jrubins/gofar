import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/app';
import HomePage from 'components/pages/home/home';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
  </Route>
);

export default routes;

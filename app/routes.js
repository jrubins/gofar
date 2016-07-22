'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import HomeContainer from './containers/pages/home/homeContainer';

const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={HomeContainer} />
    </Route>
);

export default routes;

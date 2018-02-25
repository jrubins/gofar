import React from 'react'
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import HomePage from './pages/home/HomePage'

import Ga from './reusable/scripts/Ga'
import Inspectlet from './reusable/scripts/Inspectlet'
import Modal from './reusable/modals/Modal'
import PageTracker from './reusable/trackers/PageTracker'

const App = () => (
  <div className="app-container">
    {/* Our analytics libraries. */}
    <Ga />
    <Inspectlet />

    <PageTracker />

    <Switch>
      <Route
        component={HomePage}
        exact={true}
        path="/"
      />

      <Redirect to="/" />
    </Switch>

    <Modal />
  </div>
)

export default App

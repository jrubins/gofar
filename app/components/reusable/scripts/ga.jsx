import { Component } from 'react'

import {
  ANALYTICS_LIBS,
  setupAnalytics,
} from '../../../utils/analytics'
import { insertScript } from '../../../utils/dom'

class Ga extends Component {
  componentDidMount() {
    // Setup our analytics data BEFORE we insert the actual script onto the DOM.
    setupAnalytics(ANALYTICS_LIBS.GA)

    insertScript({
      id: 'ga-sdk',
      src: 'https://www.google-analytics.com/analytics.js',
    })
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return null
  }
}

export default Ga

import { Component } from 'react'

import {
  ANALYTICS_LIBS,
  setupAnalytics,
} from '../../../utils/analytics'
import { insertScript } from '../../../utils/dom'
import {
  isDevelopment,
} from '../../../utils/environment'

class Inspectlet extends Component {
  componentDidMount() {
    // Don't want to record any local sessions.
    if (!isDevelopment()) {
      setupAnalytics(ANALYTICS_LIBS.INSPECTLET)

      insertScript({
        id: 'inspectlet',
        src: `https://cdn.inspectlet.com/inspectlet.js?wid=${process.env.INSPECTLET_APP_ID}&r=${Math.floor(new Date().getTime() / 3600000)}`,
      })
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return null
  }
}

export default Inspectlet

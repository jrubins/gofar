import { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import {
  trackPage,
} from '../../../utils/analytics'

class PageTracker extends Component {
  componentDidMount() {
    this.pageView(this.props.location.pathname)
  }

  shouldComponentUpdate() {
    return false
  }

  /**
   * Tracks a page view.
   *
   * @param {String} pathname
   */
  pageView(pathname) {
    trackPage(pathname)
  }

  render() {
    return null
  }
}

PageTracker.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default withRouter(PageTracker)

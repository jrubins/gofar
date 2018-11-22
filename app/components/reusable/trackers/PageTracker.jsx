import { useEffect } from 'react'
import PropTypes from 'prop-types'

import { trackPage } from '../../../utils/analytics'

const PageTracker = ({ location }) => {
  useEffect(
    () => {
      trackPage(location.pathname)
    },
    [location.pathname]
  )

  return null
}

PageTracker.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default PageTracker

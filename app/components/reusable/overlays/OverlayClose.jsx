import React from 'react'
import PropTypes from 'prop-types'

import CloseIcon from '../icons/CloseIcon'

const OverlayClose = ({ handleClick }) => (
  <div
    className="overlay-close"
    onClick={handleClick}
  >
    <CloseIcon />
  </div>
)

OverlayClose.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

export default OverlayClose

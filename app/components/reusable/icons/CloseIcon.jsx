import React from 'react'
import PropTypes from 'prop-types'

const CloseIcon = ({ handleClick }) => (
  <svg
    className="icon icon-close"
    onClick={handleClick}
    viewBox="0 0 30 30"
  >
    <path
      className="close-icon-path"
      d="M0,0 L30,30 M30,0 L0,30"
    />
  </svg>
)

CloseIcon.propTypes = {
  handleClick: PropTypes.func,
}

export default CloseIcon

import React from 'react'
import PropTypes from 'prop-types'

const Overlay = ({ handleClick }) => (
  <div
    className="overlay"
    onClick={handleClick}
  />
)

Overlay.propTypes = {
  handleClick: PropTypes.func,
}

export default Overlay

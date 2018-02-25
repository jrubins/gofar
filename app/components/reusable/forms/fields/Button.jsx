import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cn from 'classnames'

const Button = ({
  children,
  handleClick,
  isDisabled,
  type,
}) => (
  <button
    className={cn('button', {
      'button-disabled': isDisabled,
    })}
    disabled={isDisabled}
    onClick={event => {
      if (!isDisabled && _.isFunction(handleClick)) {
        handleClick(event)
      }
    }}
    type={type}
  >
    <span className="button-content">
      {children}
    </span>
  </button>
)

Button.defaultProps = {
  type: 'button',
}

Button.propTypes = {
  children: PropTypes.node,
  handleClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  type: PropTypes.string,
}

export default Button

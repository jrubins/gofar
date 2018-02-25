import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Input extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * Handles a change to the input's value.
   *
   * @param {SyntheticEvent} event
   */
  handleChange(event) {
    const { handleChange } = this.props

    handleChange(_.get(event, 'target.type') === 'checkbox' ? _.get(event, 'target.checked') : _.get(event, 'target.value'))
  }

  render() {
    const {
      handleChange,
      id,
      name,
      type,
      value,
    } = this.props

    return (
      <input
        checked={!!value}
        className="input"
        id={id}
        name={name}
        onChange={handleChange ? this.handleChange : null}
        type={type}
        value={_.isNil(value) ? '' : value}
      />
    )
  }
}

Input.propTypes = {
  handleChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
}

export default Input

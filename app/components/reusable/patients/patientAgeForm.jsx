import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

import { customEvent } from '../../../utils/analytics'

import { getAge } from '../../../reducers'
import { ageChanged } from '../../../actions/age'

import FormGroup from '../forms/FormGroup'
import Input from '../forms/fields/Input'

const debouncedAgeCustomEvent = _.debounce(age => {
  customEvent('Patient Age', 'Entered', age)
}, 400)

class PatientAgeForm extends React.Component {
  constructor(props) {
    super(props)

    this.handlePatientAgeChange = this.handlePatientAgeChange.bind(this)
  }

  /**
   * Handles the user changing the patient age.
   *
   * @param {String} newPatientAge
   */
  handlePatientAgeChange(newPatientAge) {
    debouncedAgeCustomEvent(newPatientAge)

    this.props.ageChanged(newPatientAge)
  }

  render() {
    const { age } = this.props

    return (
      <form className="patient-age-form">
        <FormGroup>
          <label htmlFor="patient-age">
            Patient Age:
          </label>
          <Input
            handleChange={this.handlePatientAgeChange}
            id="patient-age"
            name="patient-age"
            type="number"
            value={age}
          />
        </FormGroup>
      </form>
    )
  }
}

PatientAgeForm.propTypes = {
  age: PropTypes.string.isRequired,
  ageChanged: PropTypes.func.isRequired,
}

const PatientAgeFormContainer = connect(state => ({
  age: getAge(state),
}), {
  ageChanged,
})(PatientAgeForm)

export default PatientAgeFormContainer

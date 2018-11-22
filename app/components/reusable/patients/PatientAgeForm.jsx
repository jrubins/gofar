import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '@jrubins/react-components/lib/forms/FormGroup'
import Input from '@jrubins/react-components/lib/forms/fields/Input'
import _ from 'lodash'

import { customEvent } from '../../../utils/analytics'

const debouncedAgeCustomEvent = _.debounce(age => {
  customEvent('Patient Age', 'Entered', age)
}, 400)

const PatientAgeForm = ({ age, onAgeChanged }) => (
  <form className="patient-age-form">
    <FormGroup>
      <label htmlFor="patient-age">Patient Age:</label>
      <Input
        handleChange={newPatientAge => {
          debouncedAgeCustomEvent(newPatientAge)

          onAgeChanged(newPatientAge)
        }}
        id="patient-age"
        name="patient-age"
        type="number"
        value={age}
      />
    </FormGroup>
  </form>
)

PatientAgeForm.propTypes = {
  age: PropTypes.string,
  onAgeChanged: PropTypes.func.isRequired,
}

export default PatientAgeForm

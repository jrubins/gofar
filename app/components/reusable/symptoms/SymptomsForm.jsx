import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '@jrubins/react-components/lib/forms/FormGroup'
import _ from 'lodash'

import { SYMPTOMS } from '../../../utils/symptoms'

import Symptom from './Symptom'

const SymptomsForm = ({ selectedSymptomIds, toggleSymptom }) => (
  <form className="symptoms-form">
    {SYMPTOMS.map(symptom => (
      <FormGroup key={symptom.id}>
        <Symptom
          isSelected={_.includes(selectedSymptomIds, symptom.id)}
          symptom={symptom}
          toggleSymptom={toggleSymptom}
        />
      </FormGroup>
    ))}
  </form>
)

SymptomsForm.propTypes = {
  selectedSymptomIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleSymptom: PropTypes.func.isRequired,
}

export default SymptomsForm

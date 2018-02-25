import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getSymptoms } from '../../../reducers'

import FormGroup from '../forms/FormGroup'
import Symptom from './Symptom'

const SymptomsForm = ({ symptoms }) => (
  <form className="symptoms-form">
    {symptoms.map(symptom => (
      <FormGroup key={symptom.id}>
        <Symptom
          symptom={symptom}
        />
      </FormGroup>
    ))}
  </form>
)

SymptomsForm.propTypes = {
  symptoms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
}

export default connect(state => ({
  symptoms: getSymptoms(state),
}))(SymptomsForm)

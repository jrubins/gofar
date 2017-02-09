import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getSymptoms } from '../../../reducers';

import Symptom from './symptom';

const SymptomsForm = ({ symptoms }) => (
  <form id="components" className="form-horizontal">
    <div className="form-group">
      {symptoms.map(symptom => (
        <Symptom
          key={symptom.id}
          symptom={symptom}
        />
      ))}
    </div>
  </form>
);

SymptomsForm.propTypes = {
  symptoms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
};

const SymptomsFormContainer = connect((state) => ({
  symptoms: getSymptoms(state),
}))(SymptomsForm);

export default SymptomsFormContainer;

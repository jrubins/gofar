import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { customEvent } from '../../../utils/ga';

import { getAge } from '../../../reducers';
import { ageChanged } from '../../../actions/age';

const debouncedAgeCustomEvent = _.debounce((age) => {
  customEvent('Patient Age', 'Entered', age);
}, 400);

class PatientAgeForm extends React.Component {
  constructor(props) {
    super(props);

    this.handlePatientAgeChange = this.handlePatientAgeChange.bind(this);
  }

  handlePatientAgeChange(event) {
    const newPatientAge = event.target.value;

    debouncedAgeCustomEvent(newPatientAge);

    this.props.ageChanged(newPatientAge);
  }

  render() {
    const { age } = this.props;

    return (
      <form className="col-md-12 form-inline">
        <div className="form-group patient-age-input-container padding">
          <label htmlFor="patient-age" className="patient-age-label">Patient Age:</label>
          <input
            className="form-control patient-age-input"
            id="patient-age"
            type="number"
            value={age}
            onChange={this.handlePatientAgeChange}
          />
        </div>
      </form>
    );
  }
}

PatientAgeForm.propTypes = {
  ageChanged: PropTypes.func.isRequired,
  age: PropTypes.string.isRequired,
};

const PatientAgeFormContainer = connect(state => ({
  age: getAge(state),
}), {
  ageChanged,
})(PatientAgeForm);

export default PatientAgeFormContainer;

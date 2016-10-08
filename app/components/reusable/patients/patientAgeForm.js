import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getAge } from 'reducers';
import { ageChanged } from 'actions/age';

class PatientAgeForm extends React.Component {
  constructor(props) {
    super(props);

    this.handlePatientAgeChange = this.handlePatientAgeChange.bind(this);
  }

  handlePatientAgeChange(event) {
    this.props.ageChanged(event.target.value);
  }

  render() {
    const { age } = this.props;

    return (
      <form className="col-md-12 form-inline">
        <div id="patientAgeGroup" className="form-group padding">
          <label htmlFor="patientAge" id="patientAgeLabel">Patient Age:</label>
          <input
            id="patientAge"
            className="form-control"
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

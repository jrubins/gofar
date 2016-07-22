'use strict';

import React from 'react';

class PatientAgeForm extends React.Component {
    constructor(props) {
        super(props);

        // No autobinding for ES6 classes.
        this._onChange = this._onChange.bind(this);
    }

    _onChange(event) {
        const patientAge = event.target.value;
        console.log('Patient Age:', patientAge, event);

        this.props.onPatientAgeEntered(patientAge);
    }

    render() {
        return (
            <form className="col-md-12 form-inline">
                <div id="patientAgeGroup" className="form-group padding">
                    <label htmlFor="patientAge" id="patientAgeLabel">Patient Age:</label>
                    <input
                        id="patientAge"
                        className="form-control"
                        type="number"
                        value={this.props.patientAge}
                        onChange={this._onChange} />
                </div>
            </form>
        );
    }
};

export default PatientAgeForm;

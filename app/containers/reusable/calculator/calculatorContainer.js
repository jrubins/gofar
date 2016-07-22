'use strict';

import { connect } from 'react-redux';

import { patientAgeChanged } from './../../../actions/patientActions';
import { pointsChanged } from './../../../actions/pointsActions';
import { resetCalculator } from './../../../actions/calculatorActions';

import Calculator from './../../../components/reusable/calculator/calculator';

const mapStateToProps = (state) => {
    return {
        patient: state.patient,
        score: state.score,
        numSymptomsSelected: state.symptoms.numSymptomsSelected
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPatientAgeEntered: function(patientAge) {
            console.log('Patient age entered');

            dispatch(patientAgeChanged(patientAge));
        },
        changePoints: function(points) {
            dispatch(pointsChanged(points));
        },
        resetCalculator: function() {
            dispatch(resetCalculator());
        }
    };
};

const CalculatorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calculator);

export default CalculatorContainer;

'use strict';

import React from 'react';

import PatientAgeForm from './../patientAgeForm';
import SymptomsForm from './../symptomsForm';
import ScoreOutput from './../scoreOutput';
import Attribution from './../attribution';

class Calculator extends React.Component {
    render() {
        return (
            <div id="content" className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Good Outcome Following Attempted Resuscitation (GO-FAR)</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <p className="bg-info padding">Check each condition present on admission to the hospital to calculate total score and probability of survival.</p>
                    </div>
                </div>

                <div className="row">
                    <PatientAgeForm
                        patientAge={this.props.patient.age}
                        onPatientAgeEntered={this.props.onPatientAgeEntered} />
                </div>

                <SymptomsForm
                    changePoints={this.props.changePoints} />

                <div className="row">
                    <div className="col-md-12">
                        <ScoreOutput
                            score={this.props.score}
                            numSymptomsSelected={this.props.numSymptomsSelected}
                            resetCalculator={this.props.resetCalculator} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Attribution />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="footer smaller text-center">
                            <span>Jonathan Rubins &copy; 2015</span>
                            <span className="black-circle hidden-sm hidden-xs"></span>
                            <a className="hidden-sm hidden-xs" data-toggle="modal" href="#feedback-modal">Feedback</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Calculator;

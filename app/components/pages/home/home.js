import React from 'react';

import PatientAgeForm from 'components/reusable/patients/patientAgeForm';
import SymptomsForm from 'components/reusable/symptoms/symptomsForm';
import ScoreOutput from 'components/reusable/output/scoreOutput';
import Attribution from 'components/reusable/attribution/attribution';

const HomePage = () => (
  <div id="content" className="container">
    <div className="row">
      <div className="col-md-12">
        <h1>Good Outcome Following Attempted Resuscitation (GO-FAR)</h1>
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <p className="bg-info padding">
          Check each condition present on admission to the hospital to calculate total
          score and probability of survival.
        </p>
      </div>
    </div>

    <div className="row">
      <PatientAgeForm />
    </div>

    <SymptomsForm />

    <div className="row">
      <div className="col-md-12">
        <ScoreOutput />
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
          <span>Jonathan Rubins &copy; 2016</span>
          <span className="black-circle hidden-sm hidden-xs"></span>
          <a
            className="hidden-sm hidden-xs"
            data-toggle="modal"
            href="#feedback-modal"
          >
            Feedback
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;

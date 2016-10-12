import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { customEvent } from 'utils/ga';

import { getIsModalOpen } from 'reducers';
import { toggleModal } from 'actions/modal';

import PatientAgeForm from 'components/reusable/patients/patientAgeForm';
import SymptomsForm from 'components/reusable/symptoms/symptomsForm';
import ScoreOutput from 'components/reusable/output/scoreOutput';
import Attribution from 'components/reusable/attribution/attribution';
import FeedbackModal from 'components/reusable/modals/feedback';
import ModalBackdrop from 'components/reusable/modals/backdrop';

/**
 * Handles when a user clicks the feedback link.
 *
 * @param {Function} toggleModal
 */
function handleFeedbackClick(toggleModal) {
  customEvent('Feedback', 'Opened', 'Modal');

  toggleModal();
}

const HomePage = ({ toggleModal, isModalOpen }) => (
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
          <span className="footer-divider hidden-sm hidden-xs"></span>
          <a
            className="hidden-sm hidden-xs"
            onClick={() => handleFeedbackClick(toggleModal)}
          >
            Feedback
          </a>
        </div>
      </div>
    </div>

    <FeedbackModal />

    {isModalOpen &&
      <ModalBackdrop />
    }
  </div>
);

HomePage.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

const HomePageContainer = connect(state => ({
  isModalOpen: getIsModalOpen(state),
}), {
  toggleModal,
})(HomePage);

export default HomePageContainer;

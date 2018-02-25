import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { MODAL_TYPES } from '../../../utils/modals'
import { customEvent } from '../../../utils/analytics'

import { openModal } from '../../../actions/modal'

import Attribution from '../../reusable/attribution/Attribution'
import PatientAgeForm from '../../reusable/patients/PatientAgeForm'
import ScoreOutput from '../../reusable/output/ScoreOutput'
import SymptomsForm from '../../reusable/symptoms/SymptomsForm'

/**
 * Handles when a user clicks the feedback link.
 *
 * @param {Function} openModal
 */
function handleFeedbackClick(openModal) {
  customEvent('Feedback', 'Opened', 'Modal')

  openModal({
    type: MODAL_TYPES.FEEDBACK,
  })
}

const HomePage = ({ openModal }) => (
  <div className="home-page page">
    <h1 className="gofar-title">
      Good Outcome Following Attempted Resuscitation (GO-FAR)
    </h1>

    <p className="check-condition-instructions">
      Check each condition present on admission to the hospital to calculate total
      score and probability of survival.
    </p>

    <PatientAgeForm />

    <SymptomsForm />

    <ScoreOutput />

    <Attribution />

    <div className="footer">
      <span>Jonathan Rubins &copy; 2014-2018</span>
      <span className="footer-divider hidden-sm hidden-xs"></span>
      <a
        className="hidden-sm hidden-xs"
        onClick={() => handleFeedbackClick(openModal)}
      >
        Feedback
      </a>
    </div>
  </div>
)

HomePage.propTypes = {
  openModal: PropTypes.func.isRequired,
}

export default connect(null, {
  openModal,
})(HomePage)

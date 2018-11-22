import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { SYMPTOMS } from '../../../utils/symptoms'
import { customEvent } from '../../../utils/analytics'

import Attribution from '../../reusable/attribution/Attribution'
import PatientAgeForm from '../../reusable/patients/PatientAgeForm'
import ScoreOutput from '../../reusable/output/ScoreOutput'
import SymptomsForm from '../../reusable/symptoms/SymptomsForm'

const HomePage = ({ openFeedbackModal }) => {
  const [age, setAge] = useState(null)
  const [selectedSymptomIds, setSelectedSymptomIds] = useState([])

  return (
    <div className="home-page page">
      <h1 className="gofar-title">
        Good Outcome Following Attempted Resuscitation (GO-FAR)
      </h1>

      <p className="check-condition-instructions">
        Check each condition present on admission to the hospital to calculate
        total score and probability of survival.
      </p>

      <PatientAgeForm age={age} onAgeChanged={setAge} />

      <SymptomsForm
        selectedSymptomIds={selectedSymptomIds}
        toggleSymptom={symptomId => {
          if (_.includes(selectedSymptomIds, symptomId)) {
            setSelectedSymptomIds(_.without(selectedSymptomIds, symptomId))
          } else {
            setSelectedSymptomIds([...selectedSymptomIds, symptomId])
          }
        }}
      />

      <ScoreOutput
        age={age}
        resetCalculator={() => {
          setAge('')
          setSelectedSymptomIds([])
        }}
        selectedSymptoms={_.filter(SYMPTOMS, ({ id }) =>
          _.includes(selectedSymptomIds, id)
        )}
      />

      <Attribution />

      <div className="footer">
        <span>Jonathan Rubins &copy; 2014-2018</span>
        <span className="footer-divider hidden-sm hidden-xs" />
        <a
          className="hidden-sm hidden-xs"
          onClick={() => {
            customEvent('Feedback', 'Opened', 'Modal')

            openFeedbackModal()
          }}
        >
          Feedback
        </a>
      </div>
    </div>
  )
}

HomePage.propTypes = {
  openFeedbackModal: PropTypes.func.isRequired,
}

export default HomePage

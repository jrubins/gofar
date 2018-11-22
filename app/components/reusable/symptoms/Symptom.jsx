import React from 'react'
import PropTypes from 'prop-types'

import { customEvent } from '../../../utils/analytics'

import SymptomInfo from './SymptomInfo'

const Symptom = ({ isSelected, symptom, toggleSymptom }) => {
  /**
   * Handles when the user toggles a symptom.
   */
  function handleSymptomToggled() {
    customEvent('Symptom', 'Toggled', symptom.label)

    toggleSymptom(symptom.id)
  }

  return (
    <div className="symptom">
      <div className="symptom-checkbox">
        <label className="symptom-label">
          <input
            checked={isSelected}
            onChange={handleSymptomToggled}
            type="checkbox"
          />

          <div>
            <span>{symptom.label}</span>

            {symptom.helpText && <SymptomInfo infoText={symptom.helpText} />}
          </div>
        </label>
      </div>
    </div>
  )
}

Symptom.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  symptom: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    helpText: PropTypes.string,
  }),
  toggleSymptom: PropTypes.func.isRequired,
}

export default Symptom

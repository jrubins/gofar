import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { customEvent } from '../../../utils/analytics'

import { toggleSymptom } from '../../../actions/symptoms'

import SymptomInfo from './SymptomInfo'

class Symptom extends React.Component {
  constructor(props) {
    super(props)

    this.handleSymptomToggled = this.handleSymptomToggled.bind(this)
  }

  /**
   * Handles when the user toggles a symptom.
   */
  handleSymptomToggled() {
    const {
      symptom,
      toggleSymptom,
    } = this.props

    customEvent('Symptom', 'Toggled', symptom.label)

    toggleSymptom(symptom.id)
  }

  render() {
    const { symptom } = this.props

    return (
      <div className="symptom">
        <div className="symptom-checkbox">
          <label className="symptom-label">
            <input
              checked={symptom.selected}
              onChange={this.handleSymptomToggled}
              type="checkbox"
            />

            <div>
              <span>{symptom.label}</span>

              {symptom.helpText &&
                <SymptomInfo
                  infoText={symptom.helpText}
                />
              }
            </div>
          </label>
        </div>
      </div>
    )
  }
}

Symptom.propTypes = {
  toggleSymptom: PropTypes.func.isRequired,

  symptom: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    helpText: PropTypes.string,
  }),
}

export default connect(null, {
  toggleSymptom,
})(Symptom)

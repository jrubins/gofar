import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  calculatePointsFromAge,
  calculateProbabilityFromPoints,
} from '../../../utils/points'
import { customEvent } from '../../../utils/analytics'

import {
  getAge,
  getNumSymptomsSelected,
  getSymptomPoints,
} from '../../../reducers'
import {
  resetCalculator,
} from '../../../actions/calculator'

import Button from '../forms/fields/Button'

/**
 * Handles when a user clicks the "Clear All" button on the calculator.
 *
 * @param {Function} resetCalculator
 */
function handleClearAllClick(resetCalculator) {
  customEvent('Clear All', 'Clicked')

  resetCalculator()
}

/**
 * Represents the initial symptom points for the calculations.
 *
 * @type {Number}
 */
const INITIAL_SYMPTOM_POINTS = -15

const ScoreOutput = ({ age, numSymptomsSelected, resetCalculator, symptomPoints }) => {
  const totalPoints = calculatePointsFromAge(age) + INITIAL_SYMPTOM_POINTS + symptomPoints
  const probability = calculateProbabilityFromPoints(totalPoints)
  const clearAllBtnDisabled = (numSymptomsSelected === 0 && age === '')

  return (
    <table className="score-output-table">
      <tbody>
        <tr>
          <td>GO-FAR Score:</td>
          <td>
            <strong>{totalPoints}</strong>
          </td>
        </tr>
        <tr>
          <td>
            Probability of survival to discharge with good neurologic status following CPR for in-hospital arrest:
          </td>
          <td>
            <strong>{probability}</strong>
          </td>
        </tr>
        <tr>
          <td></td>
          <td className="score-output-table-clear">
            <Button
              handleClick={() => handleClearAllClick(resetCalculator)}
              isDisabled={clearAllBtnDisabled}
            >
              Clear All
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

ScoreOutput.propTypes = {
  age: PropTypes.string.isRequired,
  numSymptomsSelected: PropTypes.number.isRequired,
  resetCalculator: PropTypes.func.isRequired,
  symptomPoints: PropTypes.number.isRequired,
}

export default connect(state => ({
  age: getAge(state),
  numSymptomsSelected: getNumSymptomsSelected(state),
  symptomPoints: getSymptomPoints(state),
}), {
  resetCalculator,
})(ScoreOutput)

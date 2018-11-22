import React from 'react'
import PropTypes from 'prop-types'
import Button from '@jrubins/react-components/lib/forms/fields/Button'
import _ from 'lodash'

import {
  calculatePointsFromAge,
  calculateProbabilityFromPoints,
} from '../../../utils/points'
import { customEvent } from '../../../utils/analytics'

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

const ScoreOutput = ({ age, resetCalculator, selectedSymptoms }) => {
  const numSymptomsSelected = selectedSymptoms.length
  const symptomPoints = _.reduce(
    selectedSymptoms,
    (points, symptom) => points + symptom.points,
    0
  )
  const totalPoints =
    calculatePointsFromAge(age) + INITIAL_SYMPTOM_POINTS + symptomPoints
  const probability = calculateProbabilityFromPoints(totalPoints)
  const clearAllBtnDisabled = numSymptomsSelected === 0 && !age

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
            Probability of survival to discharge with good neurologic status
            following CPR for in-hospital arrest:
          </td>
          <td>
            <strong>{probability}</strong>
          </td>
        </tr>
        <tr>
          <td />
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
  age: PropTypes.string,
  resetCalculator: PropTypes.func.isRequired,
  selectedSymptoms: PropTypes.arrayOf(
    PropTypes.shape({
      points: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default ScoreOutput

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { customEvent } from 'utils/ga';
import {
  calculatePointsFromAge,
  calculateProbabilityFromPoints,
} from 'utils/points';

import {
  getAge,
  getSymptomPoints,
  getNumSymptomsSelected,
} from 'reducers';
import {
  resetCalculator,
} from 'actions/calculator';

/**
 * Handles when a user clicks the "Clear All" button on the calculator.
 *
 * @param {Function} resetCalculator
 */
function handleClearAllClick(resetCalculator) {
  customEvent('Clear All', 'Clicked');

  resetCalculator();
}

/**
 * Represents the initial symptom points for the calculations.
 *
 * @type {Number}
 */
const INITIAL_SYMPTOM_POINTS = -15;

const ScoreOutput = ({ age, symptomPoints, numSymptomsSelected, resetCalculator }) => {
  const totalPoints = calculatePointsFromAge(age) + INITIAL_SYMPTOM_POINTS + symptomPoints;
  const probability = calculateProbabilityFromPoints(totalPoints);

  const clearAllBtnDisabled = (numSymptomsSelected === 0 && age === '');

  return (
    <table className="table">
      <tbody>
        <tr>
          <td className="smaller col-md-4 col-xs-4">GO-FAR Score:</td>
          <td className="smaller col-md-2 text-center col-xs-2"><b><span>{totalPoints}</span></b></td>
        </tr>
        <tr>
          <td className="col-md-4 col-xs-4">
            Probability of survival to discharge with good neurologic status following CPR for in-hospital arrest:
          </td>
          <td className="col-md-2 text-center col-xs-2"><b><span>{probability}</span></b></td>
        </tr>
        <tr>
          <td></td>
          <td className="text-right">
            <button
              className="btn btn-info"
              type="button"
              disabled={clearAllBtnDisabled ? 'disabled' : null}
              onClick={() => handleClearAllClick(resetCalculator)}
            >
              Clear All
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

ScoreOutput.propTypes = {
  resetCalculator: PropTypes.func.isRequired,
  age: PropTypes.string.isRequired,
  symptomPoints: PropTypes.number.isRequired,
  numSymptomsSelected: PropTypes.number.isRequired,
};

const ScoreOutputContainer = connect(state => ({
  age: getAge(state),
  symptomPoints: getSymptomPoints(state),
  numSymptomsSelected: getNumSymptomsSelected(state),
}), {
  resetCalculator,
})(ScoreOutput);

export default ScoreOutputContainer;

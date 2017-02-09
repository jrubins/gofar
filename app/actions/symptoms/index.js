import { TOGGLE_SYMPTOM } from '../';

/**
 * Toggles whether or not a symptom is selected.
 *
 * @param {Number} symptomId
 * @returns {Object}
 */
export function toggleSymptom(symptomId) {
  return {
    type: TOGGLE_SYMPTOM,
    symptomId,
  };
}

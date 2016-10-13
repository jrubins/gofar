import { AGE_CHANGED } from 'actions';

/**
 * Indicates the patient age has been changed.
 *
 * @param {String} age
 * @returns {Object}
 */
export function ageChanged(age) {
  return {
    type: AGE_CHANGED,
    age,
  };
}

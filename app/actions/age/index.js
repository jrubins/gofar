import { AGE_CHANGED } from '../'

/**
 * Indicates the patient age has been changed.
 *
 * @param {String} age
 * @returns {Object}
 */
export function ageChanged(age) {
  return {
    age,
    type: AGE_CHANGED,
  }
}

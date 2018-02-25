import { RESET_CALCULATOR } from '../'

/**
 * Resets the state of the calculator.
 *
 * @returns {Object}
 */
export function resetCalculator() {
  return {
    type: RESET_CALCULATOR,
  }
}

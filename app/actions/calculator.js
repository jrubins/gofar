import { RESET_CALCULATOR } from 'actions';

/**
 * Resets the state of the calculator.
 *
 * @returns {Object}
 */
export function resetCalculator() {
  return {
    type: RESET_CALCULATOR,
  };
}

import { TOGGLE_MODAL } from 'actions';

/**
 * Toggles whether the modal is shown or hidden.
 *
 * @returns {Object}
 */
export function toggleModal() {
  return {
    type: TOGGLE_MODAL,
  };
}

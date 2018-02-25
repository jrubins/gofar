import {
  CLOSE_MODAL,
  OPEN_MODAL,
} from '../'

/**
 * Closes the modal.
 *
 * @returns {Object}
 */
export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

/**
 * Opens the modal. The type should be specified in the options.
 *
 * @param {Object} opts
 * @returns {Object}
 */
export function openModal(opts) {
  return {
    opts,
    type: OPEN_MODAL,
  }
}

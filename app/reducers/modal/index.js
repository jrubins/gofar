import { TOGGLE_MODAL } from '../../actions';

export default function modal(state = false, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return !state;

    default:
      return state;
  }
}

// Selectors.
export const getIsModalOpen = state => state;

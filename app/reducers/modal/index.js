import { combineReducers } from 'redux'

import {
  CLOSE_MODAL,
  OPEN_MODAL,
} from '../../actions'

function open(state = false, action) {
  switch (action.type) {
    case CLOSE_MODAL:
      return false

    case OPEN_MODAL:
      return true

    default:
      return state
  }
}

function opts(state = {}, action) {
  switch (action.type) {
    case CLOSE_MODAL:
      return {}

    case OPEN_MODAL:
      return action.opts

    default:
      return state
  }
}

export default combineReducers({
  open,
  opts,
})

// Selectors.
export const getModalOpts = state => state.opts
export const isModalOpen = state => state.open

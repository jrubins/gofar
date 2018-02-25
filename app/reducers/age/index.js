import {
  AGE_CHANGED,
  RESET_CALCULATOR,
} from '../../actions'

export default function age(state = '', action) {
  switch (action.type) {
    case AGE_CHANGED:
      return action.age

    case RESET_CALCULATOR:
      return ''

    default:
      return state
  }
}

// Selectors.
export const getAge = state => state

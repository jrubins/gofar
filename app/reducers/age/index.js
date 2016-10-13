import {
  AGE_CHANGED,
  RESET_CALCULATOR,
} from 'actions';

const initialState = '';

export default function age(state = initialState, action) {
  switch (action.type) {
    case AGE_CHANGED:
      return action.age;

    case RESET_CALCULATOR:
      return initialState;

    default:
      return state;
  }
}

// Selectors.
export const getAge = state => state;

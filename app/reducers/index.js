import { combineReducers } from 'redux';

import age, * as fromAge from 'reducers/age';
import modal, * as fromModal from 'reducers/modal';
import symptoms, * as fromSymptoms from 'reducers/symptoms';

export default combineReducers({
  age,
  modal,
  symptoms,
});

// Age selectors.
export const getAge = state => fromAge.getAge(state.age);

// Modal selectors.
export const getIsModalOpen = state => fromModal.getIsModalOpen(state.modal);

// Symptoms selectors.
export const getSymptoms = state => fromSymptoms.getSymptoms(state.symptoms);
export const getNumSymptomsSelected = state => fromSymptoms.getNumSymptomsSelected(state.symptoms);
export const getSymptomPoints = state => fromSymptoms.getSymptomPoints(state.symptoms);

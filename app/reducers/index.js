import { combineReducers } from 'redux'

import age, * as fromAge from './age'
import modal, * as fromModal from './modal'
import symptoms, * as fromSymptoms from './symptoms'

export default combineReducers({
  age,
  modal,
  symptoms,
})

// Age selectors.
export const getAge = state => fromAge.getAge(state.age)

// Modal selectors.
export const getModalOpts = state => fromModal.getModalOpts(state.modal)
export const isModalOpen = state => fromModal.isModalOpen(state.modal)

// Symptoms selectors.
export const getNumSymptomsSelected = state => fromSymptoms.getNumSymptomsSelected(state.symptoms)
export const getSymptomPoints = state => fromSymptoms.getSymptomPoints(state.symptoms)
export const getSymptoms = state => fromSymptoms.getSymptoms(state.symptoms)

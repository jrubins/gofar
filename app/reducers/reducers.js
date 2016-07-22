'use strict';

import { combineReducers } from 'redux';

import patientReducer from './patientReducer';
import scoreReducer from './scoreReducer';
import symptomsReducer from './symptomsReducer';

const reducers = combineReducers({
    patient: patientReducer,
    score: scoreReducer,
    symptoms: symptomsReducer
});

export default reducers;

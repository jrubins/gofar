'use strict';

import _ from 'lodash';

import { PATIENT_AGE_CHANGED } from './../constants/actionTypes';

module.exports = function patientReducer(state, action) {
    if (_.isUndefined(state)) {
        return {
            age: ''
        };
    }

    switch (action.type) {
        case PATIENT_AGE_CHANGED:
            return _.assign({}, state, {
                age: action.age
            });

        default:
            return state;
    }
};

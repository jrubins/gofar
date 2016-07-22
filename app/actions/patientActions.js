'use strict';

import { PATIENT_AGE_CHANGED } from './../constants/actionTypes';

/**
 * An example of a synchronous action.
 *
 * @return {Object}
 */
export const patientAgeChanged = (patientAge) => {
    return {
        type: PATIENT_AGE_CHANGED,
        age: patientAge
    };
};

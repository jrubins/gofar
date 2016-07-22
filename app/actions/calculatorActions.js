'use strict';

import { RESET_CALCULATOR } from './../constants/actionTypes';

/**
 * An example of a synchronous action.
 *
 * @return {Object}
 */
export const resetCalculator = () => {
    return {
        type: RESET_CALCULATOR
    };
};

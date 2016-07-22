'use strict';

import { POINTS_CHANGED } from './../constants/actionTypes';

/**
 * An example of a synchronous action.
 *
 * @return {Object}
 */
export const pointsChanged = (points) => {
    return {
        type: POINTS_CHANGED,
        points: points
    };
};

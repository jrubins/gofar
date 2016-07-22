'use strict';

import _ from 'lodash';

import { POINTS_CHANGED } from './../constants/actionTypes';

const symptomsReducer = (state, action) => {
    if (_.isUndefined(state)) {
        return {
            numSymptomsSelected: 0
        };
    }

    switch (action.type) {
        case POINTS_CHANGED:
            return _.assign({}, state, {
                numSymptomsSelected: action.points > 0 ? state.numSymptomsSelected + 1 : state.numSymptomsSelected - 1
            });

        default:
            return state;
    }
};

export default symptomsReducer;

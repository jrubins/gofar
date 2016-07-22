'use strict';

import _ from 'lodash';

import { PATIENT_AGE_CHANGED, POINTS_CHANGED, RESET_CALCULATOR } from './../constants/actionTypes';

const calculateProbabilityFromPoints = (points) => {
    if(points >= 24) {
        return '0.9%';
    } else if (points <= 23 && points >= 14) {
        return '1.7%';
    } else if (points <= 13 && points >= -5) {
        return '9.4%';
    } else if (points >= -15 && points <= -6) {
        return '27%';
    }
};

const calculatePointsFromAge = (age) => {
    if(age >= 70 && age < 75) {
        return 2;
    } else if(age >= 75 && age < 80) {
        return 5;
    } else if(age >= 80 && age < 85) {
        return 6;
    } else if(age >= 85) {
        return 11;
    } else { // If the user types any other number range.
        return 0;
    }
};

const getInitialState = () => {
    const initialAgePoints = 0;
    const initialSymptomPoints = -15;
    const initialTotalPoints = initialAgePoints + initialSymptomPoints;

    return {
        agePoints: initialAgePoints,
        symptomPoints: initialSymptomPoints,
        totalPoints: initialTotalPoints,
        probability: calculateProbabilityFromPoints(initialTotalPoints)
    };
};

const scoreReducer = (state, action) => {
    if (_.isUndefined(state)) {
        return getInitialState();
    }

    let totalPoints, newProbability;
    switch (action.type) {
        case PATIENT_AGE_CHANGED:
            const newAgePoints = calculatePointsFromAge(action.age);
            totalPoints = state.symptomPoints + newAgePoints;
            newProbability = calculateProbabilityFromPoints(totalPoints);

            return _.assign({}, state, {
                agePoints: newAgePoints,
                totalPoints: totalPoints,
                probability: newProbability
            });

        case POINTS_CHANGED:
            const newSymptomPoints = state.symptomPoints + action.points;
            totalPoints = state.agePoints + newSymptomPoints;
            newProbability = calculateProbabilityFromPoints(totalPoints);

            return _.assign({}, state, {
                symptomPoints: newSymptomPoints,
                totalPoints: totalPoints,
                probability: newProbability
            });

        case RESET_CALCULATOR:
            return _.assign({}, state, getInitialState());

        default:
            return state;
    }
};

export default scoreReducer;

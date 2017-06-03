/**
 * Calculates the probability of survival from the provided points.
 *
 * @param {Number} points
 * @returns {String}
 */
export function calculateProbabilityFromPoints(points) {
  if (points >= 24) {
    return '0.9%';
  } else if (points <= 23 && points >= 14) {
    return '1.7%';
  } else if (points <= 13 && points >= -5) {
    return '9.4%';
  } else if (points >= -15 && points <= -6) {
    return '27%';
  }
}

/**
 * Calculates the points from the provided age.
 *
 * @param {Number} age
 * @returns {Number}
 */
export function calculatePointsFromAge(age) {
  if (age >= 70 && age < 75) {
    return 2;
  } else if (age >= 75 && age < 80) {
    return 5;
  } else if (age >= 80 && age < 85) {
    return 6;
  } else if (age >= 85) {
    return 11;
  }

  return 0;
}

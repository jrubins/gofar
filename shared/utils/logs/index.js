/**
 * The logging instance.
 *
 * @type {?Object}
 */
let logger = null;

/**
 * Checks if a logging instance has been set, otherwise throws an error.
 *
 * @throws {Error}
 */
function checkForValidLogger() {
  if (!logger) {
    throw new Error('You must set the logging instance before trying to use the logger!');
  }
}

/**
 * Sets the logging instance for outputting logs.
 *
 * @param {Object} loggerToSet
 */
export function setLogger(loggerToSet) {
  logger = loggerToSet;
}

/**
 * Outputs an info message.
 *
 * @param {...String} rest
 */
export function info(...rest) {
  checkForValidLogger();
  logger.info(...rest);
}

/**
 * Outputs an error message.
 *
 * @param {...String} rest
 */
export function error(...rest) {
  checkForValidLogger();
  logger.error(...rest);
}

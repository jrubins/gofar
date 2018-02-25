/**
 * Returns if we're currently in development or not.
 *
 * @returns {Boolean}
 */
export function isDebug() {
  return process.env.DEBUG
}

/**
 * Returns if we're currently in development or not.
 *
 * @returns {Boolean}
 */
export function isDevelopment() {
  return process.env.NODE_ENV === 'development'
}

/**
 * Returns if we're currently in local or not.
 *
 * @returns {Boolean}
 */
export function isLocal() {
  return process.env.APP_ENV === 'local'
}

/**
 * Returns if we're currently in production or not.
 *
 * @returns {Boolean}
 */
export function isProduction() {
  return process.env.APP_ENV === 'production'
}

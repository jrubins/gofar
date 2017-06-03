export const APP_ENV_LOCAL = 'local';
export const APP_ENV_STAGING = 'staging';

/**
 * Returns if the current environment is the development environment.
 *
 * @returns {Boolean}
 */
export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * The Inspectlet script URL.
 *
 * @type {String}
 */
export const INSPECTLET_SCRIPT_URL = '://cdn.inspectlet.com/inspectlet.js';

/**
 * Sets up our inspectlet object.
 */
export function setupInspectlet() {
  window.__insp = window.__insp || [];
  window.__insp.push([
    'wid',
    762599318,
  ]);
}

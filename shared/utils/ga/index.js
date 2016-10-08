/**
 * The tracker name for the global GA object for pushing events.
 *
 * @type {String}
 */
const GA_TRACKER_NAME = 'ga';

/**
 * The GA UA property ID.
 *
 * @type {String}
 */
const GA_UA_ID = 'UA-60588544-1';

/**
 * The GA script URL.
 *
 * @type {String}
 */
export const GA_SCRIPT_URL = '//www.google-analytics.com/analytics.js';

/**
 * Sets up the global GA tracker object for pushing events onto.
 */
export function setupGaTracker() {
  window.GoogleAnalyticsObject = GA_TRACKER_NAME;
  window[GA_TRACKER_NAME] = window[GA_TRACKER_NAME] || function(...args) {
    (window[GA_TRACKER_NAME].q = window[GA_TRACKER_NAME].q || []).push(args);
  };
  window[GA_TRACKER_NAME].l = 1 * new Date();
}

/**
 * Inits the tracker ID and sends a pageview event.
 */
export function initAndSendPageview() {
  window[GA_TRACKER_NAME]('create', GA_UA_ID, 'auto');
  window[GA_TRACKER_NAME]('send', 'pageview');
}

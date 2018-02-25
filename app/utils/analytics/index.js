import { error } from '../logs'

/**
 * The tracker name for the global GA object for pushing events.
 *
 * @type {String}
 */
const GA_TRACKER_NAME = 'ga'

/**
 * The GA UA property ID.
 *
 * @type {String}
 */
const GA_UA_ID = process.env.GA_PROPERTY

/**
 * The different analytics libraries we have.
 *
 * @type {Object}
 */
export const ANALYTICS_LIBS = {
  GA: 'ga',
  INSPECTLET: 'inspectlet',
}

/**
 * All of the custom events that our app uses.
 *
 * @type {Object}
 */
export const EVENT_NAMES = {}

/**
 * Triggers a custom analytics event.
 *
 * @param {String} eventName
 * @param {Object} [eventOpts]
 */
export function customEvent(eventName, eventOpts = {}) {
  if (!window[GA_TRACKER_NAME]) {
    error('Tried to fire a custom event before the analytics object was initialized!')

    return
  }

  window[GA_TRACKER_NAME]('send', 'event', {
    ...eventOpts,
    eventAction: eventName,
  })
}

/**
 * Sets up the analytics object.
 *
 * @param {String} analyticsLib
 */
export function setupAnalytics(analyticsLib) {
  if (analyticsLib === ANALYTICS_LIBS.GA) {
    window.GoogleAnalyticsObject = GA_TRACKER_NAME
    window[GA_TRACKER_NAME] = window[GA_TRACKER_NAME] || function(...args) {
      (window[GA_TRACKER_NAME].q = window[GA_TRACKER_NAME].q || []).push(args)
    }
    window[GA_TRACKER_NAME].l = 1 * new Date()
    window[GA_TRACKER_NAME]('create', GA_UA_ID, 'auto')
  }

  if (analyticsLib === ANALYTICS_LIBS.INSPECTLET) {
    window.__insp = window.__insp || []
    window.__insp.push([
      'wid',
      process.env.INSPECTLET_APP_ID,
    ])
  }
}

/**
 * Tracks a pageview for analytics.
 *
 * @param {String} pathname
 */
export function trackPage(pathname) {
  window[GA_TRACKER_NAME]('send', 'pageview', pathname)
}

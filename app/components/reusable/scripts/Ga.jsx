import { useEffect } from 'react'
import { insertScript } from '@jrubins/utils/lib/dom'

import { ANALYTICS_LIBS, setupAnalytics } from '../../../utils/analytics'

const Ga = () => {
  useEffect(() => {
    // Setup our analytics data BEFORE we insert the actual script onto the DOM.
    setupAnalytics(ANALYTICS_LIBS.GA)

    insertScript({
      id: 'ga-sdk',
      src: 'https://www.google-analytics.com/analytics.js',
    })
  })

  return null
}

export default Ga

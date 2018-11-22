import { useEffect } from 'react'
import { insertScript } from '@jrubins/utils/lib/dom'
import { isDevelopment } from '@jrubins/utils/lib/environment'

import { ANALYTICS_LIBS, setupAnalytics } from '../../../utils/analytics'

const Inspectlet = () => {
  useEffect(() => {
    // Don't want to record any local sessions.
    if (!isDevelopment()) {
      setupAnalytics(ANALYTICS_LIBS.INSPECTLET)

      insertScript({
        id: 'inspectlet',
        src: `https://cdn.inspectlet.com/inspectlet.js?wid=${
          process.env.INSPECTLET_APP_ID
        }&r=${Math.floor(new Date().getTime() / 3600000)}`,
      })
    }
  })

  return null
}

export default Inspectlet

import React from 'react';

import {
  INSPECTLET_SCRIPT_URL,
  setupInspectlet,
} from '../../../utils/inspectlet';
import { insertScript } from '../../../utils/dom';
import { isDevelopment } from '../../../utils/environment';

export default class InspectletScript extends React.Component {
  componentDidMount() {
    // Don't want to record any local sessions.
    if (!isDevelopment()) {
      setupInspectlet();

      insertScript({
        id: 'inspsync',
        src: `${'https:' === document.location.protocol ? 'https' : 'http'}${INSPECTLET_SCRIPT_URL}`,
      });
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

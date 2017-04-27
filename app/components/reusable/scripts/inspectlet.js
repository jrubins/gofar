import React from 'react';

import { ENV_DEV } from '../../../constants/constants';
import {
  INSPECTLET_SCRIPT_URL,
  setupInspectlet,
} from '../../../../shared/utils/inspectlet';
import { insertScript } from '../../../../shared/utils/scripts';

export default class InspectletScript extends React.Component {
  componentDidMount() {
    // Don't want to record any local sessions.
    if (process.env.NODE_ENV !== ENV_DEV) {
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

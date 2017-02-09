import React from 'react';

import {
  GA_SCRIPT_URL,
  setupGaTracker,
  initAndSendPageview,
} from '../../../../shared/utils/ga';
import { insertScript } from '../../../../shared/utils/scripts';

export default class GaScript extends React.Component {
  componentDidMount() {
    setupGaTracker();

    initAndSendPageview();

    insertScript({
      id: 'ga-js',
      src: GA_SCRIPT_URL,
      async: true,
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

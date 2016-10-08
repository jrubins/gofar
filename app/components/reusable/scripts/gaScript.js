import React from 'react';

import { setupGaTracker, initAndSendPageview, getGaScriptUrl } from 'utils/ga';
import { insertScript } from 'utils/scripts';

export default class GaScript extends React.Component {
  componentDidMount() {
    setupGaTracker();

    initAndSendPageview();

    insertScript({
      id: 'ga-js',
      src: getGaScriptUrl(),
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

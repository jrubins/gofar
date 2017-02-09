import React from 'react';

import { customEvent } from '../../../../shared/utils/ga';

/**
 * Handles clicks on the attribution link.
 */
function handleAttributionClick() {
  customEvent('Attribution', 'Click');
}

/**
 * The attribution URL for the paper the content is derived from.
 *
 * @type {String}
 */
const ATTRIBUTION_URL = 'http://archinte.jamanetwork.com/article.aspx?articleid=1735894';

const Attribution = () => (
  <div>
    <p className="smaller">
      {'Content derived from '}
      <a href={ATTRIBUTION_URL} target="_blank" onClick={handleAttributionClick}>
      Ebell MA et al, Development and Validation of the Good Outcome Following Attempted Resuscitation (GO-FAR) Score
      to Predict Neurologically Intact Survival After In-Hospital Cardiopulmonary Resuscitation JAMA Internal Medicine
      November 11, 2013 Volume 173, Number 20</a>
    </p>
    <p className="smaller">
      DISCLAIMER: All calculations must be confirmed before use. The author make no claims of the accuracy of the
      information contained herein; and these suggested doses are not a substitute for clinical judgment. Neither
      Jonathan Rubins nor any other party involved in the preparation or publication of this site shall be liable
      for any special, consequential, or exemplary damages resulting in whole or part from any user's use of or
      reliance upon this material.
    </p>
  </div>
);

export default Attribution;

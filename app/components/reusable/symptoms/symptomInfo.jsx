import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import _ from 'lodash';

import { customEvent } from '../../../utils/ga';
import { offset } from '../../../utils/dom';

import InfoIcon from '../icons/info';

/**
 * The width of the info text container (in pixels).
 *
 * @type {Number}
 */
const INFO_TEXT_WIDTH = 250;

class SymptomInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInfoText: false,
      containerLeft: 0,
      arrowLeft: '50%',
    };

    this.mouseOverInfoText = false;

    this.handleInfoTextClick = this.handleInfoTextClick.bind(this);
    this.handleInfoTextMouseEnter = this.handleInfoTextMouseEnter.bind(this);
    this.handleInfoTextMouseLeave = this.handleInfoTextMouseLeave.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.throttledCalculateLeftShift = _.throttle(this.calculateLeftShift, 300);
  }

  componentDidMount() {
    this.throttledCalculateLeftShift();

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUmount() {
    window.clearTimeout(this.showInfoTextTimeout);

    window.removeEventListener('resize', this.handleWindowResize);
  }

  /**
   * Handles when a user clicks the info text to show the info text box.
   *
   * @param {Event} event
   */
  handleInfoTextClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      showInfoText: !this.state.showInfoText,
    });
  }

  /**
   * Handles when a user moves their mouse over the info text container.
   *
   * @param {Event} event
   */
  handleInfoTextMouseEnter() {
    this.mouseOverInfoText = true;

    // Delay showing the info text box so it's not annoying.
    this.showInfoTextTimeout = window.setTimeout(() => {
      if (this.mouseOverInfoText) {
        customEvent('Info Text', 'Shown');

        this.setState({
          showInfoText: true,
        });
      }
    }, 350);
  }

  /**
   * Handles when a user moves their mouse outside of the info text container.
   *
   * @param {Event} event
   */
  handleInfoTextMouseLeave() {
    this.mouseOverInfoText = false;

    this.setState({
      showInfoText: false,
    });
  }

  /**
   * Handles any window resizes.
   */
  handleWindowResize() {
    this.throttledCalculateLeftShift();
  }

  /**
   * Calculates the left shift for the info text box and its arrow indicator taking
   * into account the width of the user's viewport.
   */
  calculateLeftShift() {
    const containerOffset = offset(this.symptomInfoContainer);
    const halfInfoTextWidth = (INFO_TEXT_WIDTH) / 2;

    // Window bounds are adjusted so the info text boxes don't ride up against the side of the screen.
    const windowRightBound = window.innerWidth - 15;
    const windowLeftBound = 15;

    let leftShift = -1 * (halfInfoTextWidth);
    if (containerOffset.left + halfInfoTextWidth > windowRightBound) {
      // Subtract the overlap of the info text box from where the box was going to be positioned.
      const windowOverlap = containerOffset.left + halfInfoTextWidth - windowRightBound;
      leftShift = -1 * (halfInfoTextWidth + windowOverlap);
    } else if (containerOffset.left - halfInfoTextWidth < windowLeftBound) {
      // Position the info text box so its "left" coordinate is 15.
      leftShift = -1 * (containerOffset.left - 15);
    }

    this.setState({
      containerLeft: leftShift,
      arrowLeft: leftShift * -1,
    });
  }

  render() {
    const { infoText } = this.props;

    return (
      <div
        ref={symptomInfoContainer => this.symptomInfoContainer = symptomInfoContainer}
        className="symptom-info-container"
        onMouseEnter={this.handleInfoTextMouseEnter}
        onMouseLeave={this.handleInfoTextMouseLeave}
      >
        <span onClick={this.handleInfoTextClick}>
          <InfoIcon />
        </span>

        <div
          className={cn('symptom-info-content-container', {
            hidden: !this.state.showInfoText,
          })}
          style={{
            left: this.state.containerLeft,
          }}
        >
          <div
            className="symptom-info-arrow-indicator"
            style={{
              left: this.state.arrowLeft,
            }}
          ></div>
          <div className="symptom-info-content">
            {infoText}
          </div>
        </div>
      </div>
    );
  }
}

SymptomInfo.propTypes = {
  infoText: PropTypes.string.isRequired,
};

export default SymptomInfo;

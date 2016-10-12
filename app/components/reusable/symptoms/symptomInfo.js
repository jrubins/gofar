import React, { PropTypes } from 'react';
import cn from 'classnames';

import { customEvent } from 'utils/ga';

class SymptomInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInfoText: false,
    };

    this.mouseOverInfoText = false;

    this.handleInfoTextMouseEnter = this.handleInfoTextMouseEnter.bind(this);
    this.handleInfoTextMouseLeave = this.handleInfoTextMouseLeave.bind(this);
  }

  componentWillUmount() {
    window.clearTimeout(this.showInfoTextTimeout);
  }

  handleInfoTextMouseEnter() {
    this.mouseOverInfoText = true;

    this.showInfoTextTimeout = window.setTimeout(() => {
      if (this.mouseOverInfoText) {
        customEvent('Info Text', 'Shown');

        this.setState({
          showInfoText: true,
        });
      }
    }, 350);
  }

  handleInfoTextMouseLeave() {
    this.mouseOverInfoText = false;

    this.setState({
      showInfoText: false,
    });
  }

  render() {
    const { infoText } = this.props;

    return (
      <div
        className="symptom-info-container"
        onMouseEnter={this.handleInfoTextMouseEnter}
        onMouseLeave={this.handleInfoTextMouseLeave}
      >
        <i
          className="fa fa-info-circle"
        ></i>

        <div
          className={cn('symptom-info-content-container', {
            hidden: !this.state.showInfoText,
          })}
        >
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

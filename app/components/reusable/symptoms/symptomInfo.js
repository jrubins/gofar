import React, { PropTypes } from 'react';
import cn from 'classnames';

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
        className="info-text-container"
        onMouseEnter={this.handleInfoTextMouseEnter}
        onMouseLeave={this.handleInfoTextMouseLeave}
      >
        <i
          className="fa fa-info-circle"
        ></i>

        <div
          className={cn('info-text', {
            hidden: !this.state.showInfoText,
          })}
        >
          <div className="info-text-content">
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

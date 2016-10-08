import React, { PropTypes } from 'react';

class SymptomInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInfoText: false,
    };
  }

  render() {
    const { infoText } = this.props;

    return (
      <div className="info-text-container">
        <i className="fa fa-info-circle"></i>

        <div
          className="info-text"
        >
          {infoText}
        </div>
      </div>
    );
  }
}

SymptomInfo.propTypes = {
  infoText: PropTypes.string.isRequired,
};

export default SymptomInfo;

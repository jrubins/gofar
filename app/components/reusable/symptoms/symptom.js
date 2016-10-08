import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { toggleSymptom } from 'actions/symptoms';

import SymptomInfo from 'components/reusable/symptoms/symptomInfo';

class Symptom extends React.Component {
  constructor(props) {
    super(props);

    this.handleSymptomToggled = this.handleSymptomToggled.bind(this);
  }

  handleSymptomToggled() {
    this.props.toggleSymptom(this.props.symptom.id);
  }

  render() {
    const { symptom } = this.props;

    return (
      <div className="component col-md-4 col-sm-6 col-xs-12">
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={symptom.selected}
              onChange={this.handleSymptomToggled}
            />

            <div className="componentLabel">
              <span>{symptom.label}</span>
            </div>

            {symptom.helpText &&
              <SymptomInfo
                infoText={symptom.helpText}
              />
            }
          </label>
        </div>
      </div>
    );
  }
}

Symptom.propTypes = {
  toggleSymptom: PropTypes.func.isRequired,

  symptom: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    helpText: PropTypes.string,
  }),
};

const SymptomContainer = connect(null, {
  toggleSymptom,
})(Symptom);

export default SymptomContainer;

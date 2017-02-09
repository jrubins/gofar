import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { customEvent } from '../../../../shared/utils/ga';

import { toggleSymptom } from '../../../actions/symptoms';

import SymptomInfo from './symptomInfo';

class Symptom extends React.Component {
  constructor(props) {
    super(props);

    this.handleSymptomToggled = this.handleSymptomToggled.bind(this);
  }

  handleSymptomToggled() {
    const { symptom } = this.props;

    customEvent('Symptom', 'Toggled', symptom.label);

    this.props.toggleSymptom(this.props.symptom.id);
  }

  render() {
    const { symptom } = this.props;

    return (
      <div className="symptom col-md-4 col-sm-6 col-xs-12">
        <div className="symptom-checkbox checkbox">
          <label className="symptom-label">
            <input
              type="checkbox"
              checked={symptom.selected}
              onChange={this.handleSymptomToggled}
            />

            <div>
              <span>{symptom.label}</span>

              {symptom.helpText &&
                <SymptomInfo
                  infoText={symptom.helpText}
                />
              }
            </div>
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

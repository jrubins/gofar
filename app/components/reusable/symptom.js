'use strict';

import React from 'react';

class Symptom extends React.Component {
    constructor(props) {
        super(props);

        this._symptomToggled = this._symptomToggled.bind(this);
    }

    _symptomToggled(event) {
        const isSelected = event.target ? event.target.checked : false;

        // If it's selected we're adding points, otherwise we're subtracting points.
        const symptomPoints = isSelected ? this.props.symptom.points : (this.props.symptom.points * (-1));

        this.props.changePoints(symptomPoints);
    }

    render() {
        /*<!-- ko if: component.helpText -->
            <span
                className="component-help-tooltip glyphicon glyphicon-info-sign"
                data-toggle="tooltip"
                data-placement="bottom"
                data-bind="attr: { title: component.helpText }">
            </span>
        <!-- /ko -->*/
        return (
            <div className="component col-md-4 col-sm-6 col-xs-12">
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            onChange={this._symptomToggled} />

                        <div className="componentLabel">
                            <span>{this.props.symptom.label}</span>
                            {/* Insert helpText here! */}
                        </div>
                    </label>
                </div>
            </div>
        );
    }
};

export default Symptom;

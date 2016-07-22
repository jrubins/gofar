'use strict';

import React from 'react';

import symptoms from './../../config/symptoms';

import Symptom from './symptom';

class SymptomsForm extends React.Component {
    render() {
        return (
            <form id="components" className="form-horizontal">
                <div className="form-group">
                    {symptoms.map(symptom => {
                        //console.log(symptom);

                        return (
                            <Symptom
                                key={symptom.id}
                                symptom={symptom}
                                changePoints={this.props.changePoints} />
                        );
                    })}
                </div>
            </form>
        );
    }
};

export default SymptomsForm;

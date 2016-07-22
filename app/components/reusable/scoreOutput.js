'use strict';

import React from 'react';

class ScoreOutput extends React.Component {
    render() {
        return (
            <table className="table">
                <tbody>
                    <tr>
                        <td className="smaller col-md-4 col-xs-4">GO-FAR Score:</td>
                        <td className="smaller col-md-2 text-center col-xs-2"><b><span>{this.props.score.totalPoints}</span></b></td>
                    </tr>
                    <tr>
                        <td className="col-md-4 col-xs-4">Probability of survival to discharge with good neurologic status following CPR for in-hospital arrest:</td>
                        <td className="col-md-2 text-center col-xs-2"><b><span>{this.props.score.probability}</span></b></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="text-right">
                            <button
                                className="btn btn-info"
                                type="button"
                                disabled={this.props.numSymptomsSelected === 0 ? 'disabled' : null}
                                onClick={this.props.resetCalculator}>

                                Clear All
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
};

export default ScoreOutput;

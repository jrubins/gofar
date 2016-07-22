'use strict';

import React from 'react';

import CalculatorContainer from './../../../containers/reusable/calculator/calculatorContainer';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <CalculatorContainer />
            </div>
        );
    }
};

HomePage.propTypes = {};

export default HomePage;

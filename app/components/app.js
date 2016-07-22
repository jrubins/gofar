'use strict';

import React from 'react';

class App extends React.Component {
    render() {
        return (
            <div className='app-container'>
                {this.props.children}
            </div>
        );
    }
};

export default App;

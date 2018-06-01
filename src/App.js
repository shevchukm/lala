import React, { Component } from 'react';
import './App.css';
import GoodsList from './GoodsList';

/**
 * A main class
 */
class App extends Component {
    render() {
        return (
            <div>
                <GoodsList />
            </div>
        );
    }
}

export default App;

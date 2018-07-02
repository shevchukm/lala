import React from 'react';
import Navigation from './Navigation';
import AppRouter from './AppRouter'

const App = (props) => {
    return (
        <div>
            <Navigation />
            <AppRouter />
        </div>
    );
};

export default App;

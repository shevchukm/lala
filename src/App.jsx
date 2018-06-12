import React from 'react';
import { Route } from 'react-router-dom';
import GoodsList from './goods/GoodsList';
import Registration from './users/Registration';
import Login from './auth/Login';
import Navigation from './Navigation';
import AddGood from './goods/AddGood';
import UsersList from './users/UsersList'

const App = () => {
    return (
        <div>
            <Navigation />
            <Route exact 
                path="/"
                component={GoodsList}
            />
            <Route exact 
                path="/reg"
                component={Registration}
            />
            <Route exact 
                path="/login"
                component={Login}
            />
             <Route exact 
                path="/goods/add"
                component={AddGood}
            />
             <Route exact 
                path="/users/"
                component={UsersList}
            />
        </div>
    );
};

export default App;

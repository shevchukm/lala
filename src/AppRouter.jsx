import React from 'react';
import { Route, Switch} from 'react-router-dom';
import AddGood from './goods/AddGood';
import UsersList from './users/UsersList';
import GoodsList from './goods/GoodsList';
import Registration from './users/Registration';
import Login from './auth/Login';

const AppRouter = () => {
    return(
        <Switch>
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
                path="/users"
                component={UsersList}
            />
     
        </Switch>
    );
};

export default AppRouter;

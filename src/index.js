import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import goods from './reducers/goods';
import App from './App';

const store = createStore(goods);

ReactDOM.render(
    React.createElement(Provider, { store }, React.createElement(BrowserRouter, null, React.createElement(App))),
    document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'react-dates/initialize';

import { Provider } from 'react-redux';
import store from './components/redux/store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app')
);

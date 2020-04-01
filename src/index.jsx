import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App/App';
import NavigationBar from "./_components/NavigationBar";

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

render(
    <Provider store={store}>
    <NavigationBar>
            <App />
    </NavigationBar>,
    </Provider>,
    document.getElementById('app')
);
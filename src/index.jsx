import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App/App';
import NavigationBar from "./_components/NavigationBar";
import './index.css';

render(
    <Provider store={store}>
        <div className="h">
            <NavigationBar>
                <App />
            </NavigationBar>
        </div>
        
    </Provider>,
    document.getElementById('app')
);
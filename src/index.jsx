import React from 'react';
import { render } from 'react-dom';

import { App } from './App';
import NavigationBar from "./_components/NavigationBar";

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <NavigationBar>
        
            <App/>
        
    </NavigationBar>,
    document.getElementById('app')
);
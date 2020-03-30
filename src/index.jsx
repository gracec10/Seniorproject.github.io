import React from 'react';
import { render } from 'react-dom';

import { App } from './App';
import NavigationBar from "./_components/NavigationBar";

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <NavigationBar>
        <div style={{padding: "50px 0px 0px 0px"}}>
            <App/>
        </div>
    </NavigationBar>,
    document.getElementById('app')
);
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import {RegisterPage} from '../RegisterPage';
import {CreateProjectPage} from '../CreateProjectPage';
import { ProjectSummaryPage } from '../ProjectSummaryPage';
import './App.css';

class App extends React.Component {
    render() {
        /* So the PrivateRoute basically says that if you go to the web address,
        it creates a PrivateRoute which turns into either the HomePage if the user
        exists in local storage or it turns into a Route to ./login if it doesn't.

        Need to make /register go to a new register page.
        */
        return (
            <div className="jumbotron app-container">
                <div className="container">
                    <div className="col-sm-10 col-sm-offset-1">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/create-new-project" component={CreateProjectPage} />
                                <Route path="/projects" component={ProjectSummaryPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export { App }; 
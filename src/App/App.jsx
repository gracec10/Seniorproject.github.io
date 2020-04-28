import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "../_utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../_actions/authActions";
import store from '../store';

import PrivateRoute from '../_components/PrivateRoute';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import CreateProjectPage from '../CreateProjectPage/CreateProjectPage';
import { AnnotatePage } from '../AnnotatePage/AnnotatePage';
import { EditProjectPage } from '../EditProjectPage';
import { ProjectSummaryPage } from '../ProjectSummaryPage/ProjectSummaryPage'
import './App.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

        // Redirect to login
        window.location.href = "./login";
    }
}

class App extends Component {
    render() {
        return (
            <div className="jumbotron app-container app-container-outer">
                <div className="container app-container">
                    <div className="col-sm-12 app-container">
                        <Router>
                            <div className="app-container" >
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route exact path="/" component={HomePage} />
                                <Switch>
                                    <PrivateRoute exact path="/create-new-project" component={CreateProjectPage} />
                                    <PrivateRoute path="/annotate" component={AnnotatePage} />
                                    <PrivateRoute path="/projects" component={ProjectSummaryPage} />
                                    <PrivateRoute path="/edit-project" component={EditProjectPage} />
                                </Switch>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default App; 
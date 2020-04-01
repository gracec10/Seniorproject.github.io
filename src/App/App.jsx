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
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-10 col-sm-offset-1">
                        <Router>
                            <div>
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/login" component={LoginPage} />
                                <Switch>
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute exact path="/create-new-project" component={CreateProjectPage} />
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
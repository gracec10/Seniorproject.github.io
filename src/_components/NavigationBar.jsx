import React from 'react';
import './NavigationBar.css';

function NavigationBar (props) {
    return (
        <div>
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <div className="navbar-brand">Image Annotation</div>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                        <li><a href="/create-new-project">Create New Project</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="/register"><span className="glyphicon glyphicon-user"></span> Register</a></li>
                        <li><a href="/login"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                </div>
            </nav>

            <div>{props.children}</div>
        </div>
    );
}

export default NavigationBar;
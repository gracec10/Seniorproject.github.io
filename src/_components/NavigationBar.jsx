import React from 'react';
import './NavigationBar.css';

function NavigationBar (props) {
    return (
        <div>
            <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container-fluid">
                    <div class="navbar-header">
                    <div class="navbar-brand">Image Annotation</div>
                    </div>
                    <ul class="nav navbar-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                        <li><a href="/create-new-project">Create New Project</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="/register"><span class="glyphicon glyphicon-user"></span> Register</a></li>
                        <li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                </div>
            </nav>

            <div>{props.children}</div>
        </div>
    );
}

export default NavigationBar;
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../_actions/authActions";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentDidMount() {
        // If logged in and user navigates to Login page, redirects to Homepage
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            // Redirects user to Homepage on successful login
            this.props.history.push("/");
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(userData);
        this.props.loginUser(userData); 
        // Since we handle the redirect within our component, we don't need to pass 
        // in this.props.history as a parameter
    };

/*
Test account:
Email: grace.cheung@yale.edu
Password: test123
*/
render() {
    const { email, password } = this.state;
    return (
        <div className="col-sm-6 col-sm-offset-3 page-outer-cont">
            <h2>Login</h2>
            <form name="form" onSubmit={this.onSubmit}>
                <div className={'form-group'}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={email} 
                        error={this.state.errors.email} 
                        onChange={this.onChange} 
                    />
                    <span>
                        {this.state.errors.email}
                        {this.state.errors.emailnotfound}
                    </span>
                </div>

                <div className={'form-group'}>
                    <label htmlFor="email">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        value={password} 
                        error={this.state.errors.password} 
                        onChange={this.onChange} 
                    />
                    <span>
                        {this.state.errors.password}
                        {this.state.errors.passwordincorrect}
                    </span>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>

            </form>
        </div>
    );
};
};

LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(LoginPage);
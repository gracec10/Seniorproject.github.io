import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../_actions/authActions";

class RegisterPage extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
    };

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/create-new-project");
        }
    }

    componentWillReceiveProps(nextProps) {
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

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        console.log(newUser);
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        return (
            <div className="col-md-8 col-md-offset-2">
                <h2>Register New Account</h2>
                <form name="form" onSubmit={this.onSubmit}>
                    <div className={'form-group'}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={this.state.firstName}
                            error={this.state.errors.firstName}
                            onChange={this.onChange}
                        />
                        <span>{this.state.errors.firstName}</span>
                    </div>

                    <div className={'form-group'}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" id="lastName" value={this.state.lastName} error={this.state.errors.lastName} onChange={this.onChange} />
                        <span>{this.state.errors.lastName}</span>
                    </div>

                    <div className={'form-group'}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" value={this.state.email} error={this.state.errors.email} onChange={this.onChange} />
                        <span>{this.state.errors.email}</span>
                    </div>

                    <div className={'form-group'}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" value={this.state.password} error={this.state.errors.password} onChange={this.onChange} />
                        <span>{this.state.errors.password}</span>
                    </div>

                    <div className={'form-group'}>
                        <label htmlFor="password2">Confirm Password</label>
                        <input type="password" className="form-control" id="password2" value={this.state.password2} error={this.state.errors.password2} onChange={this.onChange} />
                        <span>{this.state.errors.password2}</span>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}

RegisterPage.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(RegisterPage));
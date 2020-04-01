import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../_actions/authActions";

class HomePage extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    render() {
        const { user } = this.props.auth;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in!</p>
                <button onClick={this.onLogoutClick}>Logout</button>
            </div>
        );
    }
}

HomePage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(
    mapStateToProps,
    { logoutUser }
  )(HomePage);
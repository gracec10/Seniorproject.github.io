import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../_actions/authActions";
import "./HomePage.css";
import "../index.css";

class HomePage extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    render() {
        const { user } = this.props.auth;
        const firstName = (user.firstName !== undefined) ? (" " + user.firstName ) : ("");

        return (
            <div className="col-md-6 col-md-offset-3 welcome-cont page-outer-cont">
                <h2 className="welcome-title">Welcome to Image Annotation{firstName}!</h2>
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
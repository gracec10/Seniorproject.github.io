import React from 'react';
import './NavigationBar.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../_actions/authActions";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsedBar: " static-top",
            appTopMargin: ""
        }
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener("resize", this.handleWindowResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize.bind(this));
    }    

    handleWindowResize = () => {
        if (window.innerWidth < 768) {
            this.setState({ collapsedBar: " static-top" });
            this.setState({ appTopMargin: " app-cont-static" });
        }
        else {
            this.setState({ collapsedBar: " navbar-fixed-top" });
            this.setState({ appTopMargin: " app-cont-fixed" });
        }
    }
    
    render() {
        let navBar = <div className="container-fluid">
                        <div className="navbar-header">
                            <div className="navbar-brand">Image Annotation</div>
                        </div>
                        <ul className="nav navbar-nav">
                                <li><a href="/">Home</a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/login"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                                <li><a href="/register"><span className="glyphicon glyphicon-user"></span> Register</a></li>
                            </ul>
                    </div>
        if (this.props.auth.isAuthenticated === true ) {
            navBar = <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand">Image Annotation</div>
                    </div>
                    <ul className="nav navbar-nav">
                            <li><a href="/">Home</a></li>
                            <li><a href="/create-new-project">Create New Project</a></li>
                            <li><a href="/projects">Project Summary</a></li>
                            <li><a href="/annotate">Annotate</a></li>
                            <li><a href="/edit-project">Edit Project</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="/login" onClick={this.onLogoutClick}>
                                    <span className="glyphicon glyphicon-log-in"></span> Logout
                                </a>
                            </li>
                            <li><a href="/register"><span className="glyphicon glyphicon-user"></span> Register</a></li>
                        </ul>
                </div>
            }

        return (
            <div className="nav-page-cont">
                <nav className={"navbar navbar-default" + this.state.collapsedBar}> 
                    {navBar}
                </nav>
                <div className={this.state.appTopMargin}>{this.props.children}</div>
            </div>
        );    
    }
}

NavigationBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(
    mapStateToProps,
    { logoutUser }
  )(NavigationBar);

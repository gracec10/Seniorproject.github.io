import React from 'react';
import './NavigationBar.css';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsedBar : " static-top",
            appTopMargin: ""
        }
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener("resize", this.handleWindowResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize.bind(this));
    }
    

    handleWindowResize = () => {
        if (window.innerWidth < 973) {
            this.setState({ collapsedBar: " static-top" });
            this.setState({ appTopMargin: " app-cont-static" });
        }
        else {
            this.setState({ collapsedBar: " navbar-fixed-top" });
            this.setState({ appTopMargin: "app-cont-fixed" });
        }
      }

    

    render() {
        return (
            <div>
                <nav className={"navbar navbar-default" + this.state.collapsedBar}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <div className="navbar-brand">"Image Annotation"</div>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><a href="/">Home</a></li>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/register">Register</a></li>
                            <li><a href="/create-new-project">Create New Project</a></li>
                            <li><a href="/projects">Project Summary</a></li>
                            <li><a href="/annotate">Annotate</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/register"><span className="glyphicon glyphicon-user"></span> Register</a></li>
                            <li><a href="/login"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                        </ul>
                    </div>
                </nav>

                <div className={this.state.appTopMargin}>{this.props.children}</div>
            </div>
        )
    };
}

export { NavigationBar };
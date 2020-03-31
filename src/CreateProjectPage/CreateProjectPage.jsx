import React from 'react';
import './CreateProjectPage.css';

import { userService } from '../_services';

class CreateProjectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projectTitle: '',
            projectDescription: '',
            collaborators = [],
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({ submitted: true });
        const { projectTitle, projectDescription, returnUrl } = this.state;

        // stop here if form is invalid
        //maybe add more checks on minlength/maxlength of password?  email format?
        if (!(projectTitle && projectDescription)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(projectTitle, projectDescription)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    
    render() {
        const { projectTitle, projectDescription, collaborators, submitted, loading, error } = this.state;
        return (
            <div>
                <div className="row form-row">
                    <h2 className="col-sm-12 createProjectTitle">Create New Project</h2>
                </div>

                <div className="row section-heading">
                    <h3>Project Overview Information</h3>
                </div>
                
                <form name="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className={'form-group form-row' + (submitted && !projectTitle ? ' has-error' : '')}>
                        <label className="col-sm-4 horLabel" htmlFor="projectTitle">Project Title</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="projectTitle" value={projectTitle} onChange={this.handleChange} />
                            {submitted && !projectTitle &&
                                <div className="help-block">Project Title is required</div>
                            }
                        </div>
                    </div>

                    <div className={'form-group form-row' + (submitted && !projectDescription ? ' has-error' : '')}>
                        <label className="col-sm-4 horLabel" htmlFor="projectDescription">Project Description</label>
                        <div className="col-sm-8">
                        <textarea type="textarea" className="form-control textarea" rows="5" name="projectDescription" value={projectDescription} onChange={this.handleChange} />
                            {submitted && !projectDescription &&
                                <div className="help-block">Project description is required</div>
                            }
                        </div>
                    </div>
                    
                    <div className="row section-heading">
                        <div className="divider"></div>
                        <h3>Add Collaborators</h3>
                    </div>

                    
                   
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>Login</button>
                        {loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
            </div>
        );
    }
}

export { CreateProjectPage }; 
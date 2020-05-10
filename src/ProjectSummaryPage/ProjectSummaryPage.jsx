import React, { Component } from 'react';
import './ProjectSummaryPage.css';
import { ProjectSummary } from '../_components/ProjectSummary';
import { setProjectId } from "../_actions/projectIdActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import jwt_decode from "jwt-decode";

class ProjectSummaryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            testProjects: [],
            currUser: "", //the id of the logged in user
            projects: [
                { projectTitle: "Project 1 Title", 
                    projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a nulla venenatis, pharetra ex et, ultrices purus. Curabitur nec tincidunt mi. Nulla sodales felis at erat pulvinar scelerisque. Integer bibendum malesuada tincidunt. Donec placerat sem feugiat, fringilla mauris ut, pellentesque magna. ", 
                    access: "Admin",
                    projectAdmins: ["Person A", "Person B"],
                    percentFinished: 0},
                { projectTitle: "Project 2 Title", 
                    projectDescription: "Project 2 Description", 
                    access: "Annotator",
                    projectAdmins: ["Person B"],
                    percentFinished: 25},
                { projectTitle: "Project 3 Title", 
                    access: "Admin",
                    projectDescription: "Project 3 Description", 
                    projectAdmins: ["Person B", "Person D", "Person E"],
                    percentFinished: 56}
            ],
        };
        this.handleAnnotate = this.handleAnnotate.bind(this);
        this.displayProjects = this.displayProjects.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    
    }

    handleAnnotate(projId) {
        this.setState({ currUser: projId});
        this.props.setProjectId(projId); 
        this.props.history.push("/annotate");
    }

    componentDidMount() {
        // Gets all of the projects that the current user has access to
        axios.get('http://localhost:5000/api/projects/')
            .then(res => {
                const userProjects = res.data;
                this.setState({ testProjects: userProjects });
            })
        let tok = localStorage.getItem('jwtToken');
        console.log(tok);
        let decoded = jwt_decode(tok);
        this.setState({ currUser: decoded.id});
    }
    
    displayProjects() {
        const projects = this.state.testProjects;
        console.log(projects);
        
        if (projects.length == 0) {
            return <div></div>;
        }
        else {
            const listItems = projects.map((proj) =>
               <li>
                    <ProjectSummary 
                        id={proj._id}
                        currUser={this.state.currUser}
                        title={proj.title}
                        description={proj.description}
                        admins={proj.adminIDs}
                        researchers={proj.researcherIDs}
                        annotate={this.handleAnnotate}
                        questions={proj.questionIDs}
                        images={proj.imageIDs}
                        access={"proj.access"}>
                    </ProjectSummary>
                </li>               
            );
            return (
                <ul>
                    {listItems}
                    
                </ul>
            );
        }
    }
    
    render() {
        return (
            <div className="col-sm-10 col-sm-offset-1 page-outer-cont">
                <div className="row form-row">
                    <h2 className="col-sm-12 createProjectTitle">Current Projects</h2>
                </div>
                
                <div>
                    {this.displayProjects()}
                </div>
            </div>
        );
    }
}



ProjectSummaryPage.propTypes = {
    setProjectId: PropTypes.func.isRequired,
    projectIdR: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    projectIdR: state.projectIdR
});

export default connect(
    mapStateToProps,
    { setProjectId }
)(ProjectSummaryPage);
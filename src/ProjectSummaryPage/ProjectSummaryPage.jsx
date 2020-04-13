import React from 'react';
import './ProjectSummaryPage.css';
import {ProjectSummary} from '../_components/ProjectSummary';

class ProjectSummaryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projectTitle: '',
            projectDescription: '',
            currCollab: '',
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

        this.displayProjects = this.displayProjects.bind(this);
        
    
    }
    
    displayProjects() {
        const projects = this.state.projects;
        const listItems = projects.map((proj) =>
            <li>
               <ProjectSummary 
                    title={proj.projectTitle}
                    description={proj.projectDescription}
                    admins={proj.projectAdmins}
                    access={proj.access}
                    percent={proj.percentFinished}>
                </ProjectSummary>
           </li>                
        );
        return (
            <ul>
                {listItems}
            </ul>
        );
    }
    
    render() {
        return (
            <div>
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

export { ProjectSummaryPage }; 
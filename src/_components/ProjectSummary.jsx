import React, { Component } from 'react';
import './WorkflowQuestion.css';
import './ProjectSummary.css';


class ProjectSummary extends Component {
    constructor(props) {
        super(props);
        this.joinAdmins = this.joinAdmins.bind(this);
    }

    joinAdmins() {
        let admins = "";
        for (let i=0; i < this.props.admins.length; i++) {
            admins += this.props.admins[i];
            if (i < this.props.admins.length - 1) admins += ", ";
        }
        return admins;
    }

    render() {
        const access = this.props.researchers.includes(this.props.currUser) ?
            "Researcher" : "Admin";

        // Only admins have access to edit projects
        const editBtn = (access == "Admin") ?
            <button 
                onClick={() => this.props.edit(this.props.id)}
                type="button" 
                className="btn btn-primary edit-btn btn-xs">
                Edit Project
            </button> :
            <div></div>;
        
        // Only admins have access to delete projects
        const deleteBtn = (access == "Admin") ?
            <button 
                onClick={() => this.props.delete(this.props.id)}
                type="button" 
                className="btn btn-danger remove-btn btn-xs">
                Delete Project
            </button> :
            <div></div>;

        const annotateBtn = <button 
            onClick={() => this.props.annotate(this.props.id)} 
            type="button" 
            className="btn btn-primary annotate-btn btn-xs">
            Annotate Images
        </button>;

        return (
            <div className="row proj">
                <div>
                    <div className="col-sm-2"> </div>   
                    <div className="col-sm-8">
                        <div>{deleteBtn}</div>
                        <div>{annotateBtn}</div>
                        <div>{editBtn}</div>
                    </div>
                    <div className="col-sm-2"> </div>   
                </div>
                <div>
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8 proj-cont">
                        <div className="padding-20"></div>
                        <h4 className="question-text word-wrap">Project: {this.props.title}</h4>
                        <h5 className="word-wrap">Description: {this.props.description}</h5>
                        <h5 className="word-wrap">Access Level: {access}</h5>
                        
                        <h5 className="word-wrap">Questions: {this.props.questions}</h5>
                        <h5 className="word-wrap">Images: {this.props.images}</h5>
                    </div>
                    <div className="col-sm-2"></div>
                </div>
            </div>
        )
    }
}

export { ProjectSummary }; 
//<h5 className="word-wrap">Project Admins: {this.props.admins}</h5>
//<h5 className="word-wrap">Project Researchers: {this.props.researchers}</h5>
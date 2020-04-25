import React, { Component } from 'react';
import './WorkflowQuestion.css';


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
        let editBtn = <div></div>
        if (this.props.access == "Admin") {
            editBtn = <button type="button" className="btn btn-primary edit-btn btn-xs">
                Edit Project
            </button>
        }
        return (
            <div className="row proj">
                <div>
                    <div className="col-sm-2"> </div>   
                    <div className="col-sm-8">
                    <button type="button" className="btn btn-danger remove-btn btn-xs">
                        Remove Project
                    </button>
                    <button type="button" className="btn btn-primary annotate-btn btn-xs">
                        Annotate Images
                    </button>
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
                        <h5 className="word-wrap">Access Level: {this.props.access}</h5>
                        <h5 className="word-wrap">Project Admins: {this.joinAdmins()}</h5>
                        <h5 className="word-wrap">Percent Annotated: {this.props.percent}%</h5>
                    </div>
                    <div className="col-sm-2"></div>
                </div>
                
            </div>
        )
    }
}

export { ProjectSummary }; 
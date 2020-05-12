import React, { Component } from 'react';
import './CreateProjectPage.css';
import { CollaboratorButton } from '../_components/CollaboratorButton';
import { WorkflowQuestion } from '../_components/WorkflowQuestion';
import { createProject } from '../_actions/createProjectActions';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import axios from "axios";
import { GET_ERRORS } from "../_actions/types";


class CreateProjectPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectTitle: '',
            projectDescription: '',
            projectStoredInfo: '',
            currCollab: '',
            collaborators: [],
            newQuestionText: '',
            newQuestionDescription: '',
            newQuestionType: 'Yes/No',
            newQuestionCategories: "",
            newQuestionRequired: true,
            addQuestionError: false,
            questions: [
                {id: 1,
                text: "Is there a bird?", 
                description: "Do you see something with wings", 
                type:"Yes/No", 
                categories: "",
                required: true },
                {id: 2,
                text: "Type of bird?", 
                description: "Do you see something with wings", 
                type:"Select Category", 
                categories: "Eagle",
                required: false }
            ],
            selectedFiles: [],
            submitted: false,
            loading: false,
            error: ''
        };

        this.addCollaborators = this.addCollaborators.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.handleMoveQuestion = this.handleMoveQuestion.bind(this);
        this.handleAddQuestion = this.handleAddQuestion.bind(this);
        this.handleQuestionDelete = this.handleQuestionDelete.bind(this);
        this.handleRequiredCheck = this.handleRequiredCheck.bind(this);
        this.handleQuestionType = this.handleQuestionType.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddCollab = this.handleAddCollab.bind(this);
        this.displayCollaborators = this.displayCollaborators.bind(this);
        this.displayQuestions = this.displayQuestions.bind(this);
        this.displayCategories = this.displayCategories.bind(this);
        this.handleToggleAccess = this.handleToggleAccess.bind(this);
    }

    onFileChange = event => {
        this.setState({
            selectedFiles: event.target.files,
        })
    }

    handleMoveQuestion(qId, dir){
        const questions = this.state.questions;
        let newQuestions = questions;
        if (dir == "up" && qId > 1) {
            newQuestions = questions.map((question) => {
                if (question.id == qId) question.id = question.id - 1;
                else if (question.id == qId - 1) question.id = qId;
                return question;
            });
        }
        else if (dir == "down" && qId < questions.length) {
            newQuestions = questions.map((question) => {
                if (question.id == qId) question.id = question.id + 1;
                else if (question.id == qId + 1) question.id = qId;
                return question;
            });        
        }      
        newQuestions.sort((q1, q2) => (q1.id > q2.id) ? 1 : -1 );
        this.setState({ questions: newQuestions });  
    }

    handleAddQuestion() {
        let categories = "";
        if (this.state.newQuestionType == "Select Category") {
            categories = this.state.newQuestionCategories;
        }
        const qCount = this.state.questions.length;
        const newQ = {
            id: qCount + 1,
            text: this.state.newQuestionText,
            description: this.state.newQuestionDescription,
            type: this.state.newQuestionType,
            categories: categories,
            required: this.state.newQuestionRequired
        };
        if (this.state.newQuestionText !== "") {
            const questions = this.state.questions.concat(newQ);
            this.setState({ questions: questions });
            this.setState({ newQuestionText: "" });
            this.setState({ newQuestionDescription: "" });
            this.setState({ newQuestionType: "Yes/No" });
            this.setState({ newQuestionCategories: ""});
            this.setState({ newQuestionRequired: true });
        }
        else {
            this.setState({ addQuestionError: true })
        }
    }

    handleQuestionDelete = qId => {
        const ques = this.state.questions.filter(question => question.id != qId);
        const resetId = ques.map((item, idx) => {
            item.id=idx+1;
            return item;
        });
        this.setState({ questions: resetId });
    }

    handleRequiredCheck(){
        const e = document.getElementById("requiredCheck");
        if (e.checked == true) this.setState({newQuestionRequired: true}); 
        else this.setState({newQuestionRequired: false}); 
    }

    handleQuestionType(){
        const e = document.getElementById("questionType");
        const newQType = e.options[e.selectedIndex].value;
        this.setState({newQuestionType: newQType});
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (name == "newQuestionText") {
            this.setState({ addQuestionError: false });
        }
    }

    addQuestion(projectId, question) {
        axios
            .post("http://localhost:5000/api/questions/"+projectId, question)
            .then(res => { 
                const {token} = res.data;      
            })
            .catch(err =>
                dispatch({
                type: GET_ERRORS,
                payload: err.response.data
                })
            );
    }

    addCollaborators(collab, projectId, access) {
        const userData = {
            access: access,
            projectID: projectId
        };
       
        axios
            .post("http://localhost:5000/api/users/"+collab, userData)
            .then(res => {
                console.log(res.data);
            })
            .catch(err =>
                dispatch({
                type: GET_ERRORS,
                payload: err.response.data
                })
            );        
    }

    image(projectId, images) {
               
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        for (const file of images) {
            let formData = new FormData();
            formData.append("myFiles", file);
            axios
                .post("http://localhost:5000/api/images/"+projectId, formData, config)
                .then(res => { 
                    //const {token}  = res.data;      
                })
                .catch(err =>
                    dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                    })
            );
        }
        
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({ submitted: true });
        const { projectTitle, projectDescription } = this.state;

        // stop here if form is invalid
        //maybe add more checks on minlength/maxlength of password?  email format?
        if (!(projectTitle && projectDescription)) {
            return;
        }

        const questionArray = this.state.questions.map((q) => {
            const categories = q.categories == "" ? [] : q.categories.split(",");
            return {
                question: q.text,
                description: q.description,
                type: q.type,
                categories: categories,
                required: q.required
            }
        })

        const admins = this.state.collaborators.filter((c) => {
            return c.access == "Admin";
        })
        const adminArray = admins.map((a) => {
            return a.value;
        })

        const annotators = this.state.collaborators.filter((c) => {
            return c.access == "Annotator";
        })
        const annotatorArray = annotators.map((a) => {
            return a.value;
        })

        let firstImage = this.state.selectedFiles[0];

        const projectData = {
            title: this.state.projectTitle,
            description: this.state.projectDescription,
            questions: questionArray,
            admins: adminArray,
            annotators: annotatorArray,
            images: this.state.selectedFiles
        };
        
        axios
            .post("http://localhost:5000/api/projects/", projectData)
            .then(res => { // res is the returned data
                const projectId  = res.data._id; // the id of the project just created
                
                // Add all the questions to the project
                projectData.questions.forEach(question => {
                    this.addQuestion(projectId, question);
                });

                // Add all the admins to the project
                projectData.admins.forEach(admin => {
                    this.addCollaborators(admin, projectId, "Admin");
                });

                // Add all the annotators to the project
                projectData.annotators.forEach(ann => {
                    this.addCollaborators(ann, projectId, "Annotator");
                });
                this.image(projectId, projectData.images);
            })
            .catch(err =>
                dispatch({
                type: GET_ERRORS,
                payload: err.response.data
                })
            );

        this.props.history.push("/");
    }

    handleAddCollab() {
        const newCollab = this.state.currCollab;
        let duplicates = false;
        // Checking if the newly entered collaborator is a duplicate
        this.state.collaborators.forEach(collaborator => {
            if (collaborator.value == newCollab) {
                duplicates = true;
            }
        });

        // Adding new collaborator to state if not duplicate and not null
        if (newCollab !== "" && !duplicates) {
            const collabCount = this.state.collaborators.length;
            const collaborators = this.state.collaborators.concat({id: collabCount+1, value: newCollab, access: "Admin"});           
            this.setState({ collaborators: collaborators });
            this.setState({currCollab: ''}); 
        }  
        else if (duplicates) {
            alert("Entering duplicate email");
        }     
        else if (newCollab == "") {
            alert("Entering empty email");
        }
        
    }

    displayQuestions() {
        const questions = this.state.questions;
        const listItems = questions.map((question) =>
            <li className="question-cont">
                <WorkflowQuestion 
                    id = {question.id}
                    text={question.text}
                    description={question.description}
                    type={question.type}
                    categories={question.categories}
                    required={question.required}
                    onDelete={this.handleQuestionDelete}
                    onMove={this.handleMoveQuestion}
                    maxQuestions = {this.state.questions.length}
                />
            </li>                
        );
        return (
            <ul>{listItems}</ul>
        );
    }

    displayCategories(){
        const newQuestionCategories = this.state.newQuestionCategories;
        if (this.state.newQuestionType == "Select Category") {
            return (
                <div className={'form-group form-row'}>
                    <label className="col-sm-4 horlabel" htmlFor="newQuestionCategories">Enter Categories (separated by ",")</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="newQuestionCategories" value={newQuestionCategories} onChange={this.handleChange} />
                    </div>
                </div>
            );
        }
        else {
            return <div></div>
        }
    }

    displayCollaborators(){
        const collaborators = this.state.collaborators;
        const listItems = collaborators.map((collaborator) =>
            <li>
                <CollaboratorButton 
                    value={collaborator.value}
                    id={collaborator.id}
                    access={collaborator.access}
                    onDelete={this.handleCollabDelete}
                    onChangeAccess={this.handleToggleAccess}>
                </CollaboratorButton>
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }

    handleToggleAccess(id) {
        const newCollaborators = this.state.collaborators.map((collab) => {
            if (collab.id == id) {
                collab.access = collab.access == "Admin" ? "Annotator" : "Admin";
            }
            return collab;
        });
        this.setState({collaborators: newCollaborators});
        console.log(this.state.collaborators);
    }
    
    render() {
        const { projectTitle, projectDescription, currCollab, collaborators, 
            newQuestionText, newQuestionDescription, newQuestionType, 
            newQuestionRequired, questions, submitted, loading, error } = this.state;
        
        let questionError = <div></div>
        if (this.state.addQuestionError == true) {
            questionError = <h3 className="add-question-error">Add a question before adding to the workflow.</h3>
        }

        return (
            <div className="col-sm-10 col-sm-offset-1 page-outer-cont">
                <div className="row form-row">
                    <h2 className="col-sm-12 createProjectTitle">Create New Project</h2>
                </div>
                <div className="row section-heading">
                    <h3>Project Overview Information</h3>
                </div>
                
                <form name="form-horizontal" enctype="multipart/form-data" onSubmit={this.handleSubmit}>
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
                            <textarea type="textarea" className="form-control textarea" rows="5" name="projectDescription" 
                                value={projectDescription} onChange={this.handleChange} />
                            {submitted && !projectDescription &&
                                <div className="help-block">Project description is required</div>
                            }
                        </div>
                    </div>  
                    <div className="row section-heading">
                        <div className="divider"></div>
                        <h3>Add Collaborators</h3>
                    </div>
                    <div className={'form-group form-row'}>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" name="currCollab" value={currCollab} onChange={this.handleChange} placeholder="Enter collaborator's email"/>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary" onClick={this.handleAddCollab}>Add</button>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                    <div className={"collaborator-display"}>
                        {this.displayCollaborators()}
                    </div>      
                    <div className={"row section-heading"}>
                        <div className="divider"></div>
                        <h3>Create Workflow</h3>
                    </div>
                    <div className={"row sub-section-heading"}>
                        <h4>Add New Question</h4>
                    </div>
                    <div className={'form-group form-row'}>
                        <label className="col-sm-4 horlabel" htmlFor="newQuestionText">Question</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="newQuestionText" value={newQuestionText} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className={'form-group form-row'}>
                        <label className="col-sm-4 horlabel" htmlFor="newQuestionDescription">Question Description</label>
                        <div className="col-sm-8">
                            <textarea type="textarea" rows="3" className="form-control textarea" name="newQuestionDescription" value={newQuestionDescription} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="inline-block"></div>
                    <div className={'form-group form-row'}>
                        <label className="col-sm-4 horlabel" htmlFor="questionType">Answer Type</label>
                        <div className="col-sm-8">
                            <select className="form-control" name="questionType" id="questionType" value={newQuestionType} onChange={this.handleQuestionType}>
                                <option value="Yes/No">Yes/No</option>
                                <option value="Select Category">Select Category</option>
                                <option value="Numerical">Numerical</option>
                            </select>
                        </div>                        
                    </div>     
                    <this.displayCategories />
                    <div className={'form-group form-row'}>
                        <label className="col-sm-4 horlabel" htmlFor="newQuestionRequired">Required Question</label>
                        
                        <label class="container-ch col-sm-8">
                            <input type="checkbox" className="checkbox ch" name="newQuestionRequired" id="requiredCheck" onClick={this.handleRequiredCheck} checked={newQuestionRequired}/>
                            <span class="checkmark"></span>
                        </label>
                    </div> 
                    {questionError}
                    <div className={'form-group form-row addQuestionCont'}>
                        <button type="button" className="btn btn-primary" onClick={this.handleAddQuestion}>Add Question</button>
                    </div>
                    <div className={"row sub-section-heading"}>
                        <h4>View Workflow</h4>
                    </div>
                    <div className={"question-display"}>
                        {this.displayQuestions()}
                    </div> 
                    <div className="row section-heading">
                        <div className="divider"></div>
                        <h3>Upload Project Images</h3>
                    </div>
                    <div className={"row sub-section-heading"}>
                        <h4>Upload a zip file of your project images</h4>
                    </div>
                   
                    <div className="text-align-center padding-bottom-40"> 
                        <input type="file" name="myFiles" className='file-btn' multiple onChange={this.onFileChange} /> 
                    </div> 
                    <div className="form-group submit padding-bottom-20">
                        <button className="btn btn-primary" disabled={loading} >Create Project</button>
                    </div>
                </form>
            </div>
        );
    }
}

CreateProjectPage.propTypes = {
    createProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default connect(
    null,
    { createProject }
)(CreateProjectPage);
import React from 'react';
import './CreateProjectPage.css';
import {CollaboratorButton} from '../_components/CollaboratorButton';
import {WorkflowQuestion} from '../_components/WorkflowQuestion';

import { userService } from '../_services';

class CreateProjectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projectTitle: '',
            projectDescription: '',
            currCollab: '',
            collaborators: [
                { id: 1, value: "test1@gmail.com", access: "Admin"},
                { id: 2, value: "test2@gmail.com", access: "Admin"},
                { id: 3, value: "test3@gmail.com", access: "Admin"}
            ],
            newQuestionText: '',
            newQuestionDescription: '',
            newQuestionType: 'Yes/No',
            newQuestionCategories: "",
            newQuestionRequired: true,
            questions: [
                {id: 1,
                text: "Is there a bird?", 
                description: "Do you see something with wings", 
                type:"Yes/No", 
                categories: "",
                required: "true" },
                {id: 2,
                text: "Type of bird?", 
                description: "Do you see something with wings", 
                type:"Select Category", 
                categories: "Eagle",
                required: "true" }
            ],
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleMoveQuestionUp = this.handleMoveQuestionUp.bind(this);
        this.handleMoveQuestionDown = this.handleMoveQuestionDown.bind(this);
        this.handleAddQuestion = this.handleAddQuestion.bind(this);
        this.handleRequiredCheck = this.handleRequiredCheck.bind(this);
        this.handleQuestionType = this.handleQuestionType.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddCollab = this.handleAddCollab.bind(this);
        this.displayCollaborators = this.displayCollaborators.bind(this);
        this.displayQuestions = this.displayQuestions.bind(this);
        this.displayCategories = this.displayCategories.bind(this);
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
    handleToggleAccess = (collabId) => {
        const collaborators = this.state.collaborators.map((item) => {
            if (item.id === collabId && item.access==="Admin") {
                item.access="Annotator";
            }
            else if (item.id === collabId && item.access==="Annotator") {
                item.access="Admin";
            }            
            return item;
        });
        this.setState({collaborators: collaborators});
    }
    handleQuestionDelete = qId => {
        const ques = this.state.questions.filter(question => question.id != qId);
        const resetId = ques.map((item, idx) => {
            item.id=idx+1;
            return item;
        });
        this.setState({ questions: resetId });
    }
    handleCollabDelete = collabId => {
        const collabo = this.state.collaborators.filter(collaborator => collaborator.id !== collabId);
        const resetId = collabo.map((item, idx) => {
            item.id=idx+1;
            return item;
        });
        this.setState({ collaborators: resetId });
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
    handleMoveQuestionUp(qId){
        if (qId > 1) {
            let moveUp = this.state.questions.map((question) => {
                if (question.id == qId) question.id = question.id - 1;
                else if (question.id == qId - 1) question.id = qId;
                return question;
            });
            moveUp.sort((q1, q2) => (q1.id > q2.id) ? 1 : -1 );
            this.setState({ questions: moveUp });
        }
    }
    handleMoveQuestionDown(qId){
        if (qId < this.state.questions.length) {
            let moveDown = this.state.questions.map((question) => {
                if (question.id == qId) question.id = question.id + 1;
                else if (question.id == qId + 1) question.id = qId;
                return question;
            });
            moveDown.sort((q1, q2) => (q1.id > q2.id) ? 1 : -1 );
            this.setState({ questions: moveDown });
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
                    onMoveUp={this.handleMoveQuestionUp}
                    onMoveDown={this.handleMoveQuestionDown}
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
    
    render() {
        const { projectTitle, projectDescription, currCollab, collaborators, 
            newQuestionText, newQuestionDescription, newQuestionType, 
            newQuestionRequired, questions, submitted, loading, error } = this.state;
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
                        <div className="col-sm-3"></div>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" name="currCollab" value={currCollab} onChange={this.handleChange} placeholder="Enter collaborator's email"/>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary" onClick={this.handleAddCollab}>Add</button>
                        </div>
                        <div className="col-sm-3"></div>
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
                        <div className="col-sm-8">
                            <input type="checkbox" className="checkbox" name="newQuestionRequired" id="requiredCheck" onClick={this.handleRequiredCheck} checked={newQuestionRequired}/>
                        </div>
                    </div> 
                    <div className={'form-group form-row addQuestionCont'}>
                        <button type="button" className="btn btn-primary" onClick={this.handleAddQuestion}>Add Question</button>
                    </div>
                    <div className={"row sub-section-heading"}>
                        <h4>View Workflow</h4>
                    </div>
                    <div className={"question-display"}>
                        {this.displayQuestions()}
                    </div> 
                    <div className="inline-block"></div>
                    <div className="form-group submit">
                        <button className="btn btn-primary" disabled={loading} >Create Project</button>
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
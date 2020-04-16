import React from 'react';
import './AnnotatePage.css';
import {CollaboratorButton} from '../_components/CollaboratorButton';
import {AnnotateQuestion} from '../_components/AnnotateQuestion';

import { userService } from '../_services';

/*
Answer model:
answer
questionID
imageID
userID
*/

class AnnotatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projectTitle: 'Classify the birds',
            projectDescription: 'Here you will classify the birds by species',
            questions: [
                {id: 1,
                text: "Is there a bird?", 
                description: "Do you see something with wings", 
                type:"Yes/No", 
                categories: "",
                required: "true" },
                {id: 2,
                text: "Type of bird?", 
                description: "Look at the wings, beak, etc.", 
                type:"Select Category", 
                categories: "Eagle,Crow,Hawk",
                required: "false" },
                {id: 3,
                text: "How many birds?", 
                description: "Count the birds", 
                type:"Numerical", 
                categories: "Eagle,Crow,Hawk",
                required: "false" },
                {id: 4,
                text: "How many birds?", 
                description: "Count the birds", 
                type:"Numerical", 
                categories: "Eagle,Crow,Hawk",
                required: "false" }
            ],
            image: {
                id: 1,
                src: ""
            },
            answers: ["", "", "", ""],
            optionalNote: "",
            submitted: false,
            loading: false,
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSkipQues = this.handleSkipQues.bind(this);
        this.handleAnswerNum = this.handleAnswerNum.bind(this);
        this.handleAnswerSelect = this.handleAnswerSelect.bind(this);
        this.displayQuestions = this.displayQuestions.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleAnswerSelect(qId){
        const e = document.getElementById("answer"+qId);
        const newQType = e.options[e.selectedIndex].value;
        const newAnsArr = this.state.answers.map((item, idx) => {
            if (idx == qId - 1) {
                return newQType;
            }
            else {
                return item;
            }
        });
        
        this.setState({answers: newAnsArr});        
    }

    handleAnswerNum(qId){
        const e = document.getElementById("answer"+qId);
        const newQType = e.value;
        if (!isNaN(newQType) || 
            (newQType[0] == "-" && !isNaN(newQType.substring(1)) 
            || newQType=="-" || newQType=="." || newQType=="-.")) {
            const newAnsArr = this.state.answers.map((item, idx) => {
                if (idx == qId - 1) {
                    return newQType;
                }
                else {
                    return item;
                }
            });
            
            this.setState({answers: newAnsArr}); 
        }         
    }

    handleSkipQues(qId) {
        const newAnsArr = this.state.answers.map((item, idx) => {
            if (idx == qId - 1 && this.state.answers[idx] !== "Skip") {
                return "Skip";
            }
            else {
                return item;
            }
        });
        this.setState({answers: newAnsArr});   
    }

    displayQuestions() {
        const questions = this.state.questions;
        const listItems = questions.map((question, idx) =>
            <li className="question-cont">
                <AnnotateQuestion 
                    id = {question.id}
                    value = {this.state.answers[idx]}
                    text={question.text}
                    description={question.description}
                    type={question.type}
                    categories={question.categories}
                    required={question.required}
                    onSelect={this.handleAnswerSelect}
                    onChangeNum = {this.handleAnswerNum}
                    onSkip = {this.handleSkipQues}
                />
            </li>                
        );
        return (
            <ul className="question-list">{listItems}</ul>
        );
    }
    
    render() {
        const { projectTitle, projectDescription, questions, answers, 
            image, submitted, loading, error } = this.state;
        return (
            <div>
                <div className="row form-row">
                    <h2 className="col-sm-12 createProjectTitle">Annotating: {projectTitle}</h2>
                </div>
                <div className="row section-heading">
                    <h3>{projectDescription}</h3>
                </div>

                <div className="row form-row annotate-cont">
                    <div className="col-sm-8 img-cont" >
                        <img src={"https://images.unsplash.com/photo-1507477338202-487281e6c27e?ixlib=rb-1.2.1&w=1000&q=80"} />
                    </div>
                    <div className="col-sm-4 form-cont" >
                        <form name="form-horizontal" className="form-annotate">
                            <h3 className="form-title">Image #{image.id}</h3>
                            
                            <div className="display-questions">
                                {this.displayQuestions()}
                                <div className="annotate-divider"></div>
                                <div className="optionalNote">
                                    <h4>Optional Note</h4>
                                    <label htmlFor="projectDescription">Enter any other important information.</label>
                                </div>
                                <textarea type="textarea" className="optional-note-text-area"  name="optionalNote" 
                                    value={this.state.optionalNote} onChange={this.handleChange} />
                            </div> 

                            <div className="form-group submit next-btn">
                                <button className="btn btn-primary" disabled={loading} >Next</button>
                                {loading &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>

                        
                        </form>

                    </div>
                </div>
                
            </div>
        );
    }
}

export { AnnotatePage }; 
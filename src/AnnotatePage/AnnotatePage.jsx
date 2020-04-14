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
            answers: [],
            submitted: false,
            loading: false,
            error: ''
        };
        this.displayQuestions = this.displayQuestions.bind(this);
    }

    displayQuestions() {
        const questions = this.state.questions;
        const listItems = questions.map((question) =>
            <li className="question-cont">
                <AnnotateQuestion 
                    id = {question.id}
                    text={question.text}
                    description={question.description}
                    type={question.type}
                    categories={question.categories}
                    required={question.required}
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
                        <form name="form-horizontal">
                            <h3 className="form-title">Image #{image.id}</h3>
                            
                            <div className="display-questions">
                                {this.displayQuestions()}
                            </div> 

                        
                        </form>

                    </div>
                </div>
                
            </div>
        );
    }
}

export { AnnotatePage }; 
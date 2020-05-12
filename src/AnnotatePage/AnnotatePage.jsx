import React, { Component } from 'react';
import './AnnotatePage.css';
import { AnnotateQuestion } from '../_components/AnnotateQuestion';
import { setProjectId } from "../_actions/projectIdActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from 'axios';

/*
Answer model:
answer
questionID
imageID
userID
*/

class AnnotatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectId: this.props.projectIdR.projectId,
            collapsedBar: "",
            projectTitle: 'Project Title',
            projectDescription: 'Project Description',
            questions: [],
            answers: [],
            tempQuestions: [
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
            optionalNote: "",
            activeQuestion: 1,
            submitted: false,
            loading: false,
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSkipQues = this.handleSkipQues.bind(this);
        this.handleAnswerNum = this.handleAnswerNum.bind(this);
        this.handleAnswerSelect = this.handleAnswerSelect.bind(this);
        this.displayQuestions = this.displayQuestions.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleAnswerYesNo = this.handleAnswerYesNo.bind(this);
        this.setActiveQ = this.setActiveQ.bind(this);
        this.incrementActiveQ = this.incrementActiveQ.bind(this);
    }

    handleKeyDown = (event) => {
        const activeQ = this.state.activeQuestion;
        
        switch( event.keyCode ) {
            case 40: // Down arrow key pressed
                if (this.state.questions[activeQ-1].type == "Select Category") {
                    document.getElementById("answer"+activeQ).focus({preventScroll: false});
                }
                break;
            case 13: // Enter key pressed
                event.preventDefault(); 
                event.stopPropagation();
                this.incrementActiveQ();
                break;

            case 89: // "y" key pressed
                if (this.state.questions[activeQ - 1].type == "Yes/No") {
                    event.preventDefault(); 
                    event.stopPropagation();
                    this.handleAnswerYesNo(activeQ, "Yes");
                    this.incrementActiveQ();
                }
                break;
            
            case 83: // "s" key pressed
                if (this.state.questions[activeQ -1].required == "false") {
                    event.preventDefault(); 
                    event.stopPropagation();
                    this.handleSkipQues(activeQ);
                    this.incrementActiveQ();
                }
                break;

            case 78: // "n" key pressed
                if (this.state.questions[activeQ - 1].type == "Yes/No") {
                    event.preventDefault(); 
                    event.stopPropagation();
                    this.handleAnswerYesNo(activeQ, "No");
                    this.incrementActiveQ();
                }
                break;
        }
        
    }

    incrementActiveQ() {
        const activeQ = this.state.activeQuestion;
        const newActiveQ = activeQ + 1;
        const newActiveQIdx = newActiveQ - 1;
        
        if (activeQ > 0) {//<= this.state.questions.length) {
            document.getElementById("answer"+activeQ).blur();
        }        
        else {
            document.getElementById("optional-note").blur();
        }

        if (newActiveQ > this.state.questions.length) {
            this.setState({ activeQuestion: 0 });//this.state.questions.length + 1 });
            
            var note = document.getElementById("optional-note");
            note.focus();
            note.scrollIntoView({behavior: "smooth", block: "center"});
        }
        else {
            this.setState({ activeQuestion: newActiveQ });

            if (this.state.questions[newActiveQIdx].type == "Numerical"){
                document.getElementById("answer"+newActiveQ).focus();
            }
        
            var element = document.getElementById("answer"+newActiveQ);
            element.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }

    setActiveQ(qId) {
        const oldActiveQ = this.state.activeQuestion;

        if (oldActiveQ > 0) document.getElementById("answer"+oldActiveQ).blur();
        else document.getElementById("optional-note").blur();

        this.setState({ activeQuestion: qId });

        if (qId >= 1) {
            if (this.state.questions[qId-1].type == "Numerical"){
                document.getElementById("answer"+qId).focus();
            }       
            var element = document.getElementById("answer"+qId);
            element.scrollIntoView({behavior: "smooth", block: "center"});
        }
        else if (qId == 0) {
            var note = document.getElementById("optional-note");
            note.focus();
            note.scrollIntoView({behavior: "smooth", block: "center"});
        }

        
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener("resize", this.handleWindowResize.bind(this));

        // Gets the project and saves the title and description to state
        axios.get("http://localhost:5000/api/projects/"+this.state.projectId)
            .then(res => {
                console.log("Project data")
                console.log(res.data);
                this.setState({ projectTitle: res.data.title });
                this.setState({ projectDescription: res.data.description });
            })

        // Gets all of the questions for this project and create answer array
        axios.get("http://localhost:5000/api/questions/"+this.state.projectId)
            .then(res => {
                const questions = res.data.map((question, idx) => {
                    return {
                        id: idx+1,
                        text: question.content,
                        description: question.description,
                        type: question.type,
                        required: question.required.toString(),
                        categories: question.categories
                    }
                })
                this.setState({ questions: questions });
                

                const numQuestions = this.state.questions.length;
                let answerArr = Array(numQuestions).fill("");
                this.setState({ answers: answerArr });
                
                console.log("questions");
                console.log(this.state.questions);
                console.log("answers");
                console.log(this.state.answers);

                var element = document.getElementById("answer1");
                element.scrollIntoView({behavior: "smooth", block: "center"}); 

                window.addEventListener("keydown", this.handleKeyDown);
            })            
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize.bind(this));
        window.removeEventListener("keydown", this.handleKeyDown);
    }
    

    handleWindowResize = () => {
        if (window.innerWidth < 973) {
            this.setState({ collapsedBar: " static-top" });
        }
        else {
            this.setState({ collapsedBar: " navbar-fixed-top" });
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleAnswerYesNo(qId, value){
        const newAnsArr = this.state.answers.map((item, idx) => {
            if (idx == qId - 1) {
                return value;
            }
            else {
                return item;
            }
        });
        
        this.setState({answers: newAnsArr}); 
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
        else {
            this.setState({projectTitle: newQType});
            this.setState({answers: this.state.answers});
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
                    onYesNo={this.handleAnswerYesNo}
                    onChangeNum = {this.handleAnswerNum}
                    onSkip = {this.handleSkipQues}
                    onSetActive = {this.setActiveQ}
                    isActiveQ = {question.id == this.state.activeQuestion}
                />
            </li>                
        );
        return (
            <ul className="question-list">{listItems}</ul>
        );
    }
    
    render() {
        const { projectTitle, image, loading, error } = this.state;

        let returnVal = 
            <div className="error-cont">
                <h3>Screen too small to display image.</h3>
            </div>

        const optionalNoteStyle = 
            (this.state.activeQuestion == 0) ? //== this.state.questions.length + 1) ?
            "optional-note-active" : "";
        
        if (window.innerWidth > 767) {
            returnVal = 
                <div className="annotate-cont">
                    <div className="col-sm-8 img-cont" >
                        <img src={"https://images.unsplash.com/photo-1507477338202-487281e6c27e?ixlib=rb-1.2.1&w=1000&q=80"} />
                    </div>
                    <div className="col-sm-4 form-cont" >
                        <form name="form-horizontal" className="form-annotate">
                            <h3 className="form-title">Annotating Image #{image.id} of</h3>
                            <h3 className="form-title"><em>{projectTitle}{this.state.activeQuestion}</em></h3>
                            
                            <div className="display-questions">
                                {this.displayQuestions()}
                                
                                <div className={"optional-note-cont "+optionalNoteStyle} onClick={() => this.setActiveQ(0)}>
                                    <div className="annotate-divider"></div>
                                    <div className="optionalNote">
                                        <h4>Optional Note</h4>
                                        <label htmlFor="projectDescription">Enter any other important information.</label>
                                    </div>
                                    <textarea type="textarea" className="optional-note-text-area" name="optionalNote" 
                                        id="optional-note" rows="1" value={this.state.optionalNote} onChange={this.handleChange} />
                                </div>
                            </div> 

                            <div className="form-group next-btn">
                                <button type="button" className="btn btn-primary" disabled={loading} >Next</button>
                                {loading &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                        </form>
                    </div>
                </div>
        }

        return (
            <div>
                {returnVal}
            </div>
        );
    }
}

AnnotatePage.propTypes = {
    setProjectId: PropTypes.func.isRequired,
    projectIdR: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    projectIdR: state.projectIdR
});

export default connect(
    mapStateToProps,
    { setProjectId }
)(AnnotatePage);
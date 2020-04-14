import React, { Component } from 'react';
import './AnnotateQuestion.css';



class AnnotateQuestion extends Component {
    render() {
        let answer = <div></div>
        if (this.props.type == "Yes/No"){
            answer = <div>
                <select name={"answer"+this.props.id} id="questionType">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
        }
        else if (this.props.type == "Numerical"){
            answer = <div>
                <div className="num-entry">
                    <input type="text" className="form-control" name={"answer"+this.props.id} />
                </div>
            </div>
        }
        else if (this.props.type == "Select Category") {
            let categories = this.props.categories.split(',').map((cat) =>
                <option value={cat}>{cat}</option>
            );
            answer = <div>
                <select name={"answer"+this.props.id} id="questionType">
                    {categories}
                </select>
            </div>
        }
        else {
            answer = <h5>Invalid answer type.</h5>
        }

        let skip = <div></div>
        if (this.props.required == "false") {
            skip = <div className="skip">
                    <label className="horizontal" htmlFor="skipCheck">Skip Question:</label>
                    <label className="container-ch horizontal">
                        <input type="checkbox" className="checkbox ch" name="skipCheck" id="skipCheck" checked={false}/>
                        <span className="checkmark"></span>
                    </label>
                </div>
            
        }
        
        
        return (
            <div className="question-container question-center">
                <div className="divider"></div>
                <h4>Question {this.props.id}: {this.props.text}</h4>
                <label htmlFor={"answer"+this.props.id}>{this.props.description}</label>
                {answer}
                {skip}
            </div>
            
            
        );
    }
}

export { AnnotateQuestion }; 
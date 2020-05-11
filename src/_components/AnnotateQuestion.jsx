import React, { Component } from 'react';
import './AnnotateQuestion.css';

class AnnotateQuestion extends Component {
    render() {
        let displayValue = this.props.value == "Skip" ? "" : this.props.value;

        let answer = <div></div>
        if (this.props.type == "Yes/No"){
            answer = <div>
                <select className="annotate-input" name={"answer"+this.props.id} id={"answer"+this.props.id} onClick={() => this.props.onSelect(this.props.id)}>
                    <option hidden disabled selected value> -- select an option -- </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <p>{this.props.value}</p>
            </div>
        }
        else if (this.props.type == "Numerical"){
            answer = <div>
                <div className="num-entry">
                    <input type="text" className="form-control annotate-input" value={displayValue} name={"answer"+this.props.id} id={"answer"+this.props.id} onChange={() => this.props.onChangeNum(this.props.id)} />
                </div>
            </div>
        }
        else if (this.props.type == "Select Category") {
            let categories = this.props.categories.map((cat) =>
                <option value={cat}>{cat}</option>
            );
            answer = <div>
                <select name={"answer"+this.props.id} className="annotate-input" value={this.props.value} id={"answer"+this.props.id} onChange={() => this.props.onSelect(this.props.id)}>
                    <option hidden selected value> -- select an option -- </option>
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
                    <label className="" htmlFor="skipCheck">Skip Question:</label>
                    <div className="container-ch-outer">
                        <label className="container-ch " >
                            <input type="checkbox" className="checkbox ch" onClick={() => this.props.onSkip(this.props.id)} name="skipCheck" id="skipCheck" checked={this.props.value == "Skip"}/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                   
                </div>
        }
        
        return (
            <div className="question-container question-center">
                <div className="annotate-divider"></div>
                <h4>Question {this.props.id}: {this.props.text}</h4>
                <label htmlFor={"answer"+this.props.id}>{this.props.description}</label>
                {answer}
                {skip}
            </div>
        );
    }
}

export { AnnotateQuestion }; 
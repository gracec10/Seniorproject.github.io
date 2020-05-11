import React, { Component } from 'react';
import './AnnotateQuestion.css';

/*
<select className="annotate-input"  onClick={() => this.props.onSelect(this.props.id)}>
    <option hidden disabled selected value> -- select an option -- </option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
</select>

<p>{this.props.value}</p>
*/


class AnnotateQuestion extends Component {
    render() {
        let displayValue = this.props.value == "Skip" ? "" : this.props.value;

        let answer = <div></div>
        if (this.props.type == "Yes/No"){

            let yesSelected = "";
            let noSelected = "";
            if(this.props.value == "Yes") yesSelected = " selected-btn";
            else if(this.props.value == "No") noSelected = " selected-btn";

            answer = <div className="num-entry" name={"answer"+this.props.id} id={"answer"+this.props.id}>
                <button 
                    type="button" 
                    onClick={() => this.props.onYesNo(this.props.id, "Yes")} 
                    className={"yes-no-btn "+yesSelected}>
                        Yes
                </button>
                <button 
                    type="button" 
                    onClick={() => this.props.onYesNo(this.props.id, "No")} 
                    className={"yes-no-btn "+noSelected}>
                        No
                </button>
            </div>
        }
        else if (this.props.type == "Numerical"){
            answer = <div>
                <div className="num-entry">
                    <input type="text" className="form-control annotate-input" value={this.props.value} name={"answer"+this.props.id} id={"answer"+this.props.id} onChange={() => this.props.onChangeNum(this.props.id)} />
                </div>
            </div>
        }
        else if (this.props.type == "Select Category") {
            let categories = this.props.categories.map((cat) =>
                <option className="annotate-option" value={cat}>{cat}</option>
            );
            
            answer = <div className="pos-relative">
                <select 
                    tabIndex={1} 
                    onFocus={(e)=>{e.target.size=this.props.categories.length}} 
                    onBlur={(e)=>{e.target.size="0"}} 
                    name={"answer"+this.props.id} 
                    className="annotate-input annotate-select num-entry" 
                    value={this.props.value} 
                    id={"answer"+this.props.id} 
                    onChange={() => this.props.onSelect(this.props.id)}>

                    <option hidden selected value className="annotate-option"> -- select an option -- </option>
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

        const activeQStyle = (this.props.isActiveQ) ? "active-question" : "";
        
        return (
            <div className={"question-container question-center "+activeQStyle} onClick={() => this.props.onSetActive(this.props.id)}>
                <div className="annotate-divider"></div>
                <div className={activeQStyle}>
                    <h4>Question {this.props.id}: {this.props.text}</h4>
                    <label htmlFor={"answer"+this.props.id}>{this.props.description}</label>
                    {answer}
                    {skip}
                    <div className="question-bottom"></div>
                </div>
            </div>
        );
    }
}

export { AnnotateQuestion }; 
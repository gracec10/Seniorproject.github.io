import React, { Component } from 'react';
import './WorkflowQuestion.css';


class WorkflowQuestion extends Component {
    render() {
        let categories= <div></div>;
        if (this.props.type == "Select Category") {
            categories = <h5>Categories: {this.props.categories}</h5>;
        }
        let disabledUp="";
        if (this.props.id == 1) {
            disabledUp=" disabled btn-disabled";
        }
        let disabledDown="";
        if (this.props.id == this.props.maxQuestions) {
            disabledDown = " disabled btn-disabled";
        }
        return (
            <div className="row">
                <div className="col-sm-2">
                    <div>
                        <button 
                            type="button" 
                            className={"btn btn-xs move-up-down"+disabledUp} 
                            onClick={() => this.props.onMove(this.props.id, "up")}
                        >
                            <i class="arrow up"></i>
                        </button>
                    </div>
                    <div>
                        <button 
                            type="button" 
                            className={"btn btn-xs move-up-down"+disabledDown} 
                            onClick={() => this.props.onMove(this.props.id, "down")}
                        >
                            <i class="arrow down"></i>
                        </button>
                    </div>
                </div>
                <div className="col-sm-8 workflow-question">
                    <button 
                        type="button" 
                        className="btn btn-danger x-btn btn-xs" 
                        onClick={() => this.props.onDelete(this.props.id)}
                    >
                        X
                    </button>
                    <div className="padding-25"></div>
                    <h4 className="question-text word-wrap">Question {this.props.id}: {this.props.text}</h4>
                    <h5 className="word-wrap">Description: {this.props.description}</h5>
                    <h5 className="word-wrap">Type: {this.props.type}</h5>
                    <h5 className="word-wrap">{categories}</h5>
                    <h5>Required question: {this.props.required.toString()}</h5>
                </div>
                <div className="col-sm-2"></div>
            </div>
        )
    }
}

export { WorkflowQuestion }; 
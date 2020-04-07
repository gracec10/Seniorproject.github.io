import React, { Component } from 'react';
import './WorkflowQuestion.css';


class WorkflowQuestion extends Component {
    render() {
        let categories= <div></div>
        if (this.props.type == "Select Category") {
            categories = <h5>Categories: {this.props.categories}</h5>
        }
        return (
            <div clasName="row question-row">
                <div className="col-sm-2">
                    <button type="button" className="btn btn-danger btn-xs question-btn" onClick={() => this.props.onDelete(this.props.id)}>
                        Remove
                    </button>
                </div>
                <div className="col-sm-8 question">
                    <h4 className="question-text">Question {this.props.id}: {this.props.text}</h4>
                    <h5>Description: {this.props.description}</h5>
                    <h5>Type: {this.props.type}</h5>
                    {categories}
                    <h5>Required question: {this.props.required.toString()}</h5>
                </div>
                <div className="col-sm-2"></div>
            </div>
        )
    }
}

export { WorkflowQuestion }; 
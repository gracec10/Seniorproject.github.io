import React, { Component } from 'react';
import './CollaboratorButton.css';

class CollaboratorButton extends Component {
    render() {
        return (
            <div className="collaborator-cont">
                <button 
                    type="button" 
                    className="btn btn-danger btn-xs collaborator-delete" 
                    onClick={() => this.props.onDelete(this.props.id)}
                >
                    Remove
                </button>
                <span className="collaborator-text">
                    {this.props.value}
                </span>
                <select 
                    id="view" 
                    value={this.props.access}
                    onChange={() => this.props.onChangeAccess(this.props.id)}
                >
                    <option value="Admin">Admin</option>
                    <option value="Annotator">Annotator</option>
                </select>
            </div>        
        );    
    }    
};

export { CollaboratorButton };
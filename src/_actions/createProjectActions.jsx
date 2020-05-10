import axios from "axios";
import setAuthToken from "../_utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS
  } from "./types";

export const addQuestions = (projectId, questions) => dispatch => {
    console.log(questions[0]);
    axios
      .post("http://localhost:5000/api/questions/:"+projectId, questions[0])
      .then(res => { // res is the returned data
        // Save to localStorage
  
        // Set token to localStorage
        const {token}  = res.data; // the id of the project just created        
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
};




// Login - get user token
export const createProject = projectData => dispatch => {
    axios
      .post("http://localhost:5000/api/projects/", projectData)
      .then(res => { // res is the returned data
        const projectId  = res.data; // the id of the project just created
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
    
/*
    if (strr.length == 0) return;

    console.log(projectData.questions[0]);
    axios
      .post("http://localhost:5000/api/questions/:"+projectId, projectData.questions[0])
      .then(res => { // res is the returned data
        // Save to localStorage
  
        // Set token to localStorage
        const {token}  = res.data; // the id of the project just created        
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
*/


  };
import axios from "axios";

import {
   SET_PROJECT_ID
 } from "./types";

// Set the project id in the store
export const setProjectId = projId => dispatch => {
   dispatch(setProjectIdHelper(projId))
  };

// Set logged in user
export const setProjectIdHelper = projId => {
   return {
     type: SET_PROJECT_ID,
     payload: projId
   };
 };

// Delete project
export const deleteProject = projectId => dispatch => {
  axios
    .delete('http://localhost:5000/api/projects/'+projectId)
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    )
};
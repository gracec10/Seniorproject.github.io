import axios from "axios";
import setAuthToken from "../_utils/setAuthToken";
import jwt_decode from "jwt-decode";

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
import axios from "axios";
import setAuthToken from "../_utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
  } from "./types";

// http://localhost:5000/api/projects/

// Get projects for currently logged in user
export const userProjects = () => {
    axios
        .get("http://localhost:5000/api/projects/")
        .then(res => {
            const token = res.data; // token is the actual data that is returned
        })
        .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            }),
            console.log(err)
        );
        
};
/*// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => { // res is the returned data
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data; // token = return.data.  This is what I want
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
*/
import {
    SET_PROJECT_ID
  } from "../_actions/types";
  
//  const isEmpty = require("is-empty");
  
  const initialState = {
    projectId: "",
    isValid: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_PROJECT_ID:
        return {
          ...state,
          isValid: true,//!isEmpty(action.payload),
          projectId: action.payload
        };
      default:
        return state;
    }
  }
import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import projectIdReducer from "./projectIdReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  projectIdR: projectIdReducer
});

export default rootReducer;
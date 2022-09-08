import { combineReducers } from "redux";
import bugReducer from './bugs';
import projectReducer from'./projects';
import user from "./user";
import usersReducer from './user'

export default combineReducers({
    bugs: bugReducer,
    projects: projectReducer,
    users: usersReducer
})
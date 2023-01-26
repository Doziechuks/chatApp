import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import profileReducer from "./profile/profileReducer";


export default combineReducers({
  user: userReducer,
  profile: profileReducer
});
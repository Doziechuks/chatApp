import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import profileReducer from "./profile/profileReducer";
import friendsChatReducer from "./friendsChat/friendsChatReducer";


export default combineReducers({
  user: userReducer,
  profile: profileReducer,
  friend: friendsChatReducer
});
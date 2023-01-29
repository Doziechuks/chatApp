import { profileActionType } from "./profileActionType";

const INITIAL_STATE = {
  hideMyProfile: false,
  hideFriendProfile: false
}

const profileReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case profileActionType.HIDE_MY_PROFILE:
      return {
        ...state,
        hideMyProfile: !state.hideMyProfile
      }
    case profileActionType.HIDE_FRIEND_PROFILE:
      return {
        ...state,
        hideFriendProfile: !state.hideFriendProfile
      }
    default: 
    return state;
  }
}

export default profileReducer;
import { profileActionType } from "./profileActionType";

const INITIAL_STATE = {
  hideMyProfile: false
}

const profileReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case profileActionType.HIDE_MY_PROFILE:
      return {
        ...state,
        hideMyProfile: !state.hideMyProfile
      }
    default: 
    return state;
  }
}

export default profileReducer;
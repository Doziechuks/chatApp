import { friendsChatActionType } from "./friendschatActionType";

const INITIAL_STATE = {
  friendsChat: {}
}

const friendsChatReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case friendsChatActionType.FRIEND_CHAT:
      return {
        ...state,
        friendsChat: action.payload
      }
    default:
      return state;
  }
}

export default friendsChatReducer
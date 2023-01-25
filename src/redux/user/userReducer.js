import { userType } from "./userType"

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  errorMessage: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case userType.IS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case userType.ERROR_MESSAGE:
      return {
        ...state,
        isLoading: false,
        errorMessage: true
      }
    case userType.SET_CURRENT_USER:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;
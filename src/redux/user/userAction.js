import { userType } from "./userType";

export const handleLoading = () => ({
  type: userType.IS_LOADING
});

export const handleErrorMessage = () => ({
  type: userType.ERROR_MESSAGE
});

export const handleUserAction = (user) => ({
  type: userType.SET_CURRENT_USER,
  payload: user
});
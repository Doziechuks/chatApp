import { profileActionType } from "./profileActionType";

export const handleHideMyProfile = () => ({
  type: profileActionType.HIDE_MY_PROFILE
});

export const handleHideFriendProfile = () => ({
  type: profileActionType.HIDE_FRIEND_PROFILE,
});
export const handleShowChatContainer = () => ({
  type: profileActionType.SHOW_CHATCONTAINER
});
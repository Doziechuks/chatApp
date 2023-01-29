import { createSelector } from "reselect";

const selectProfile = state =>state.profile;

export const selectMyProfile = createSelector(
  [selectProfile],
  (MyProfile) => MyProfile.hideMyProfile
);
export const selectFriendProfile = createSelector(
  [selectProfile],
  (friendProfile) => friendProfile.hideFriendProfile
);
export const selectChatContainer = createSelector(
  [selectProfile],
  (chat) => chat.showChatContainer
);
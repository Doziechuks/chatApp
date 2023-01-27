import { createSelector } from "reselect";

const selectFriend = state => state.friend;

export const selectFriendsChat = createSelector(
  [selectFriend],
  (friend) => friend.friendsChat
);
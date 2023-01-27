import { friendsChatActionType } from "./friendschatActionType";

export const handleFriendsChat = (friend) => ({
  type: friendsChatActionType.FRIEND_CHAT,
  payload: friend
});
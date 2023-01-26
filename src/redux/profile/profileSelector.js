import { createSelector } from "reselect";

const selectProfile = state =>state.profile;

export const selectMyProfile = createSelector(
  [selectProfile],
  (MyProfile) => MyProfile.hideMyProfile
);
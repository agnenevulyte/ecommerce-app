import {createSelector} from 'reselect';

const selectUser = (state) => state.user;

export const selectCuttentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

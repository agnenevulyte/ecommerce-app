import {UserActionTypes} from './userTypes';
const initialState = {
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        // takes everything from initialState what is not changing
        ...initialState,
        currentUser: action.payload,
      };

    //define more cases as your project builds.
    default:
      return state;
  }
};

export default userReducer;

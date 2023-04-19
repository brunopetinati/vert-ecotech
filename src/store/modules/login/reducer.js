import { USER_LOGIN, USER_UPDATE } from "./action-types";

const initialState = {
  accessToken: null,
  currentUser: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        currentUser: action.payload.currentUser,
      };
    
    case USER_UPDATE:
      return {
        ...state,
        currentUser: action.payload.currentUser
      }

    default:
      return state;
  }
};

export default loginReducer;
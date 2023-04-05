import { USER_LOGIN } from "./action-types";

const initialState = {
  accessToken: null,
  userData: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        userData: action.payload.userData,
      };
    default:
      return state;
  }
};

export default loginReducer;
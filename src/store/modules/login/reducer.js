import { USER_LOGIN } from "./action-types";

/* const defaultState = {
  token: localStorage.getItem("authToken") || "",
};

const loginReducer = (state = defaultState, actions) => {
  switch (actions.types) {
    case USER_LOGIN:
      return { ...state, token: actions.token };

    default:
      return state;
  }
};

export default loginReducer;


import { USER_LOGIN } from '../actions/auth'; */

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
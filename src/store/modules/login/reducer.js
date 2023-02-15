import { USER_LOGIN } from "./action-types";

const defaultState = {
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
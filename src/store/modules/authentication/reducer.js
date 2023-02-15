import { SET_AUTHENTICATE } from "./actions-type";

const authenticateReducer = (state = false, action) => {
  switch (action.type) {
    case SET_AUTHENTICATE:
      return action.isAuthenticated;
    default:
      return state;
  }
};

export default authenticateReducer;

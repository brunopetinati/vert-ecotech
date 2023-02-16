import { APP_STATUS } from "./action-types";

const appStatusReducer = (state = 'Dashboard', action) => {
  switch (action.type) {

    case APP_STATUS:
      return state = action;

    default:
      return state;
  }
};

export default appStatusReducer;
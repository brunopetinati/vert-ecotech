import { SIDEBAR } from "./action-types";

const sidebarReducer = (state = false, action) => {
  switch (action.type) {

    case SIDEBAR:
      return state = action;

    default:
      return state;
  }
};

export default sidebarReducer;
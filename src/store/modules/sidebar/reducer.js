import { SIDEBAR } from "./action-types";

const sidebarReducer = (state = true, action) => {
  switch (action.type) {

    case SIDEBAR:
      return state = action.payload;

    default:
      return state;
  }
};

export default sidebarReducer;
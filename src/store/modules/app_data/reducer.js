import { STORE_PROJECT_ID, STORE_USERS } from "./action-types";

const initialState = {
  id: null,
  users: []
};

const currentAppData = (state = initialState, action) => {
  switch (action.type) {
    case STORE_PROJECT_ID:
      return {
        ...state,
        id: action.payload,
      };

    case STORE_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};

export default currentAppData;
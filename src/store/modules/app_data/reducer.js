import { STORE_PROJECT_ID, STORE_USERS, STORE_PROJECTS } from "./action-types";

const initialState = {
  id: null,
  users: [],
  projects: []
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
    
    case STORE_PROJECTS:
      return {
        ...state, 
        projects: action.payload
      };

    default:
      return state;
  }
};

export default currentAppData;
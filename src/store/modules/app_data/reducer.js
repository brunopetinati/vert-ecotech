import { STORE_PROJECT_ID, STORE_OWNER_ID, STORE_USERS, STORE_PROJECTS, STORE_USER_TO_USERS, STORE_CEP, STORE_PROJECT_TO_PROJECTS } from "./action-types";

const initialState = {
  project_id: null,
  owner_id: null,
  users: [],
  projects: [],
  cep: null
};

const currentAppData = (state = initialState, action) => {
  switch (action.type) {
    case STORE_PROJECT_ID:
      return {
        ...state,
        project_id: action.payload,
      };

    case STORE_OWNER_ID:
      return {
        ...state,
        owner_id: action.payload,
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

    case STORE_USER_TO_USERS:
      return {
        ...state,
        users: [...state.users, action.payload]
      }

    case STORE_CEP:
      return {
        ...state,
        cep: action.payload
      }

    case STORE_PROJECT_TO_PROJECTS:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      }

    default:
      return state;
  }
};

export default currentAppData;
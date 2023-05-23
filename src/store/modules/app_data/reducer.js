import { STORE_PROJECT_ID, STORE_USER_FIRST_ACCESS, STORE_OWNER_ID, STORE_USERS, STORE_PROJECTS, STORE_USER_TO_USERS, STORE_CEP, STORE_PROJECT_TO_PROJECTS, RESET_PROJECTS, ERASE_PROJECTS, ERASE_ALL } from "./action-types";

const initialState = {
  project_id: null,
  owner_id: null,
  users: [],
  projects: [],
  cep: null,
  user_first_access: [],
};

const currentAppData = (state = initialState, action) => {
  switch (action.type) {
    case STORE_PROJECT_ID:
      return {
        ...state,
        project_id: action.payload,
      };
    
    case STORE_USER_FIRST_ACCESS:
      return {
        ...state,
        user_first_access: action.payload
      }

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
    
    case RESET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      }
    
    case ERASE_PROJECTS:
      return {
        ...state,
        projects: []
      }
    case ERASE_ALL:
      return {
        initialState
      }

    default:
      return state;
  }
};

export default currentAppData;
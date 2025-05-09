import { STORE_PROJECT_ID, 
  STORE_USER_FIRST_ACCESS, 
  STORE_USERS, STORE_PROJECTS, 
  STORE_OWNER_ID, 
  STORE_USER_TO_USERS, 
  STORE_CEP, 
  STORE_PROJECT_TO_PROJECTS, 
  STORE_ENGINEERING_TABLE, 
  STORE_COMMERCIAL_TABLE, 
  RESET_PROJECTS, 
  ERASE_PROJECTS, 
  ERASE_ALL } 
  from "./action-types";

export const storeProjectId = (project_id) => {
  return {
    type: STORE_PROJECT_ID,
    payload: project_id,
  };
};

export const storeUserFirstAccess = (user) => {
  return {
    type: STORE_USER_FIRST_ACCESS,
    payload: user
  }
}

export const storeOwnerId = (owner_id) => {
  return {
    type: STORE_OWNER_ID,
    payload: owner_id,
  };
};

export const storeUsers = (users) => {
  return {
    type: STORE_USERS,
    payload: users,
  };
};

export const storeProjects = (projects) => {
  return {
    type: STORE_PROJECTS,
    payload: projects,
  }
};

export const addUserToUsers = (user) => {
  return {
    type: STORE_USER_TO_USERS,
    payload: user
  }
};

export const storeCEP = (cep) => {
  return {
    type: STORE_CEP,
    payload: cep
  }
};

export const addProjectToProjects = (project) => {
  return {
    type: STORE_PROJECT_TO_PROJECTS,
    payload: project
  }
}

export const storeEngineeringTable = (engineering) => {
  return {
    type: STORE_ENGINEERING_TABLE,
    payload: engineering
  }
}

export const storeCommercialTable = (commercial) => {
  return {
    type: STORE_COMMERCIAL_TABLE,
    payload: commercial
  }
}

export const resetProjects = (array) => {
  return {
    type: RESET_PROJECTS,
    payload: array
  }
}

export const eraseProjects = () => {
  return {
    type: ERASE_PROJECTS
  }
}



export const eraseAll = () => {
  return {
    type: ERASE_ALL
  }
}
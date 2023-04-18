import Projects from "../../../components/projects";
import { STORE_PROJECT_ID, STORE_USERS, STORE_PROJECTS, STORE_OWNER_ID, STORE_USER_TO_USERS, STORE_CEP } from "./action-types";

export const storeProjectId = (project_id) => {
  return {
    type: STORE_PROJECT_ID,
    payload: project_id,
  };
};

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
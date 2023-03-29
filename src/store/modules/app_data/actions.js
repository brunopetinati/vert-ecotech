import Projects from "../../../components/projects";
import { STORE_PROJECT_ID, STORE_USERS, STORE_PROJECTS } from "./action-types";

export const storeProjectId = (id) => {
  return {
    type: STORE_PROJECT_ID,
    payload: id,
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
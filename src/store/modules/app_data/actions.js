import { STORE_PROJECT_ID, STORE_USERS } from "./action-types";

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
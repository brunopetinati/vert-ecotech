import { USER_LOGIN, USER_UPDATE } from "./action-types";

export const userLogin = (accessToken, currentUser) => ({
  type: USER_LOGIN,
  payload: {
    accessToken,
    currentUser,
  },
});

export const userUpdater = (currentUser) => ({
  type: USER_UPDATE,
  payload: {
    currentUser
  }
});
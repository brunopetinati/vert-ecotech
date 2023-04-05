import { USER_LOGIN, USER_UPDATE } from "./action-types";

export const userLogin = (accessToken, userData) => ({
  type: USER_LOGIN,
  payload: {
    accessToken,
    userData,
  },
});

export const userUpdater = (userData) => ({
  type: USER_UPDATE,
  payload: {
    userData
  }
});
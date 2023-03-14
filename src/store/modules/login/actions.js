import { USER_LOGIN } from "./action-types";

export const userLogin = (accessToken, userData) => ({
  type: USER_LOGIN,
  payload: {
    accessToken,
    userData,
  },
});
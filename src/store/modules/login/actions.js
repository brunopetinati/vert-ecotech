import { USER_LOGIN } from "./action-types";

export const userLogin = (token) => ({
  type: USER_LOGIN,
  token,
});
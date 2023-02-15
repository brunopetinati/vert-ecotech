import { USERS_REGISTER } from "./action-types";

export const userRegister = (users) => ({
  type: USERS_REGISTER,
  users,
});
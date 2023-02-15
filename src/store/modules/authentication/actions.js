import { SET_AUTHENTICATE } from "./actions-type";

export const setAuthenticate = (isAuthenticated) => ({
  type: SET_AUTHENTICATE,
  isAuthenticated,
});

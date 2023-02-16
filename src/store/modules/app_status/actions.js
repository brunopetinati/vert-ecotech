import { APP_STATUS } from "./action-types";

export const appStatus = (status) => ({
  type: APP_STATUS,
  status,
});



import { SIDEBAR } from "./action-types";

export const collapseSidebar = (status) => ({
  type: SIDEBAR,
  payload: status,
});
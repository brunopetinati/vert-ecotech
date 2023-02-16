import { DASHBOARD, PROJECTS, CART, STORE, SETTINGS } from "./action-types";

export const dashboardStatus = (status) => ({
  type: DASHBOARD,
  status,
});

export const previousStatus = (status) => ({
  type: PROJECTS,
  status,
});


export const cartStatus = (status) => ({
  type: CART,
  status,
});

export const storeStatus = (status) => ({
  type: STORE,
  status,
});

export const settingsStatus = (status) => ({
  type: SETTINGS,
  status,
});

import { PROJECTS_LAYOUT, USERS_LAYOUT } from "./action-types";

export const projectsCards = (layout) => ({
  type: PROJECTS_LAYOUT,
  layout
});

export const usersCards = (layout) => ({
  type: USERS_LAYOUT,
  layout
});


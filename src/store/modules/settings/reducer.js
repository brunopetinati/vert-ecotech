import { PROJECTS_LAYOUT, USERS_LAYOUT } from './action-types';

const initialState = {
  cardsLayoutProjects: false,
  cardsLayoutUsers: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_LAYOUT:
      return {
        ...state,
        cardsLayoutProjects: !action.layout,
      };

    case USERS_LAYOUT:
      return {
        ...state,
        cardsLayoutUsers: !action.layout,
      };
    default:
      return state;
  }
};


export default layoutReducer;

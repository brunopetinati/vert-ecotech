import { DASHBOARD, PROJECTS, CART, STORE, SETTINGS } from "./action-types";

const appStatusReducer = (state = '', action) => {
  switch (action.type) {

    case DASHBOARD:
      return state = 'Dashboard';

    case PROJECTS:
      return state = 'Projects';

    case CART:
      return state = 'Cart';

    case STORE:
      return state = 'Store';
    
    case SETTINGS:
      return state = 'Settings';

    default:
      return state;
  }
};

export default appStatusReducer;
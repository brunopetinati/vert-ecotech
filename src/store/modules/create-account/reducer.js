import { USERS_REGISTER } from "./action-types";

const createUserReducer = (state = [], actions) => {
  switch (actions.types) {
    case USERS_REGISTER:
      const { users } = actions;
      return (state = [...state, users]);

    default:
      return state;
  }
};

export default createUserReducer;
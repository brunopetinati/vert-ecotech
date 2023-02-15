import { ADD_TO_LIST } from "./action-types";

const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_LIST:
      const { movie } = action;
      return [...state, movie];

    default:
      return state;
  }
};

export default moviesReducer;
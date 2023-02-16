import { ADD_MOVIE_TO_FAVORITE, REMOVE_MOVIE_FROM_FAVORITE } from "./action-types";

const favoriteMoviesReducer = (state = [], action) => {

  switch (action.type) {
    case ADD_MOVIE_TO_FAVORITE:

      const { data } = action;

      const preventDuplicate = state.filter((song) => song.title !== data.title);

      state = preventDuplicate

      return [...state, data]

    case REMOVE_MOVIE_FROM_FAVORITE:

      const { dataToRemove } = action;

      const removeFromFavorite = state.filter((song) => song.title !== dataToRemove.title);

      state = removeFromFavorite

      return state


    default:
      return state
  }
};

export default favoriteMoviesReducer;
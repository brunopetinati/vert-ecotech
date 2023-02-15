import { ADD_MOVIE_TO_FAVORITE, REMOVE_MOVIE_FROM_FAVORITE } from "./action-types";

export const addMoviesToFavorites = (data) => ({
  type: ADD_MOVIE_TO_FAVORITE,
  data
});

export const removeMoviesFromFavorites = (data) => ({
  type: REMOVE_MOVIE_FROM_FAVORITE,
  data
});
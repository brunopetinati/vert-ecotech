import { ADD_TO_LIST } from "./action-types";

export const addMovies = (movie) => ({
  type: ADD_TO_LIST,
  movie,
});
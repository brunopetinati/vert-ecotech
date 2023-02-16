import { addMoviesToFavorites, removeMoviesFromFavorites } from "./actions";


export const addMoviesToFavoritesThunk = (data) => (dispatch) => {
  dispatch(addMoviesToFavorites(data));   
};


export const removeMoviesFromFavoritesThunk = (dataToRemove) => (dispatch) => {
  dispatch(removeMoviesFromFavorites(dataToRemove));
};
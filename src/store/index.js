
import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'

import thunk from "redux-thunk";

// REDUCERS

//import favoriteMoviesReducer from "./modules/favorite-movies/reducer";
//import createUserReducer from "./modules/create-account/reducer";
//import loginReducer from "./modules/login/reducer";
//import moviesReducer from './modules/movies/reducer'
//import authenticateReducer from './modules/authentication/reducer'
import appStatusReducer from "./modules/app_status/reducer";

const reducers = combineReducers({

  app_status: appStatusReducer
});

const store = configureStore({reducer: reducers}, applyMiddleware(thunk));

export default store;
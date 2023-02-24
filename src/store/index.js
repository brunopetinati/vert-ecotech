
import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'

import thunk from "redux-thunk";

// REDUCERS

import appStatusReducer from "./modules/app_status/reducer";
import sidebarReducer from './modules/sidebar/reducer'

const reducers = combineReducers({
  app_status: appStatusReducer,
  sidebar: sidebarReducer
});

const store = configureStore({reducer: reducers}, applyMiddleware(thunk));

export default store;

import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'

import thunk from "redux-thunk";

// REDUCERS

import appStatusReducer from "./modules/app_status/reducer";
import sidebarReducer from './modules/sidebar/reducer';
import loginReducer from './modules/login/reducer';
import currentAppData from './modules/app_data/reducer';
import layoutReducer from "./modules/settings/reducer";

const reducers = combineReducers({
  app_status: appStatusReducer,
  app_data: currentAppData,
  user: loginReducer,
  sidebar: sidebarReducer,
  layout: layoutReducer
});

const store = configureStore({reducer: reducers}, applyMiddleware(thunk));

export default store;
import { combineReducers, compose } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";

import appStatusReducer from "./modules/app_status/reducer";
import sidebarReducer from './modules/sidebar/reducer';
import loginReducer from './modules/login/reducer';
import currentAppData from './modules/app_data/reducer';
import layoutReducer from "./modules/settings/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  app_status: appStatusReducer,
  app_data: currentAppData,
  user: loginReducer,
  sidebar: sidebarReducer,
  layout: layoutReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  enhancers: [composeEnhancers]
});

export default store;
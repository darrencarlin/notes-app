import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { noteAppReducer } from "./noteApp";

const rootReducer = combineReducers({
  noteApp: noteAppReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

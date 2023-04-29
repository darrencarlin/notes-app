import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { noteSliceReducer } from "@/store/state/noteSlice";
import { modalSliceReducer } from "./modalSlice";

const rootReducer = combineReducers({
  noteSlice: noteSliceReducer,
  modalSlice: modalSliceReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

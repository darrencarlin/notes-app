import type { Modals, ModalState } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalState = {
  deleteNoteModal: false,
  deleteDataModal: false,
};

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<Modals>) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export const modalSliceReducer = modalSlice.reducer;

import type { Note, RootState } from "@/types";
import { Mode } from "@/types";
import { ALPHABET } from "@/util/constants";
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState = {
  userId: "",
  passcode: "",
  editMode: Mode.VIEW_MODE,
  letters: ALPHABET,
  notes: [],
  currentLetter: "",
  currentNote: {
    id: "",
    title: "",
    body: "",
    letter: "",
    lastUpdated: "",
  },
  modalOpen: false,
  menuOpen: false,
  loading: false,
};

export const noteApp = createSlice({
  name: "noteApp",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEditMode: (state, action: PayloadAction<Mode>) => {
      state.editMode = action.payload;
    },
    setLetter: (state, action: PayloadAction<string>) => {
      state.currentLetter = action.payload;
      state.currentNote =
        current(state.notes).find((note) => note.letter === action.payload) ??
        ({
          id: "",
          title: "",
          body: "",
          letter: "",
          lastUpdated: "",
        } as const);
      state.editMode = Mode.VIEW_MODE;
    },
    setNote: (state, action: PayloadAction<Note>) => {
      state.currentNote = action.payload;
      state.editMode = Mode.VIEW_MODE;
      if (state.menuOpen) state.menuOpen = false;
    },
    setData: (
      state,
      action: PayloadAction<{ notes: Note[]; userId: string; passcode: string }>
    ) => {
      const { notes, userId, passcode } = action.payload;
      state.notes = notes;
      // state.currentLetter = notes.reduce((acc: string, note: Note) => {
      //   if (note.letter < acc) return note.letter;
      //   return acc;
      // }, "z");

      state.currentLetter = "";
      state.currentNote =
        notes.find((note: Note) => note.letter === state.currentLetter) ??
        ({
          id: "",
          title: "",
          body: "",
          letter: "",
          lastUpdated: "",
        } as const);
      state.userId = userId;
      state.passcode = passcode;
    },

    editNote: (state, action: PayloadAction<Note>) => {
      const { id } = action.payload;

      const noteIndex = state.notes.findIndex((note) => note.id === id);

      if (noteIndex !== -1) {
        state.notes[noteIndex] = { ...action.payload };
        state.currentNote = { ...action.payload };
      }
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      state.currentNote = { ...action.payload };
      state.currentLetter = action.payload.letter;
      state.editMode = Mode.VIEW_MODE;
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const noteIndex = state.notes.findIndex((note) => note.id === id);

      if (noteIndex !== -1) {
        state.notes.splice(noteIndex, 1);
        state.currentNote = {
          id: "",
          title: "",
          body: "",
          letter: "",
          lastUpdated: "",
        } as const;
      }

      state.editMode = Mode.VIEW_MODE;
      state.currentLetter = state.notes[0]?.letter ?? "";
      state.currentNote =
        state.notes.find((note) => note.letter === state.currentLetter) ??
        ({
          id: "",
          title: "",
          body: "",
          letter: "",
          lastUpdated: "",
        } as const);
    },
    toggleModal: (state) => {
      state.modalOpen = !state.modalOpen;
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const {
  setLoading,
  setEditMode,
  setLetter,
  setNote,
  setData,
  editNote,
  addNote,
  deleteNote,
  toggleModal,
  toggleMenu,
} = noteApp.actions;

export const noteAppReducer = noteApp.reducer;

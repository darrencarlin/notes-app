import type { Note, RootState } from "@/types";
import { Screen } from "@/types";
import { ALPHABET } from "@/util/constants";
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";

const initialState: RootState = {
  userId: "",
  passcode: "",
  screen: Screen.HOME,
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
    setScreen: (state, action: PayloadAction<Screen>) => {
      state.screen = action.payload;
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
      state.screen = Screen.VIEW;
    },
    setNote: (state, action: PayloadAction<Note>) => {
      state.currentNote = action.payload;
      state.screen = Screen.VIEW;
      state.currentLetter = action.payload.letter;
      if (state.menuOpen) state.menuOpen = false;
    },
    setData: (
      state,
      action: PayloadAction<{ notes: Note[]; userId: string; passcode: string }>
    ) => {
      const { notes, userId, passcode } = action.payload;
      state.notes = notes;

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
      state.screen = Screen.VIEW;
    },
    deleteNote: (state, action: PayloadAction<Note>) => {
      const id = action.payload.id;
      const letter = action.payload.letter;

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

      state.screen = Screen.VIEW;
      state.currentLetter = state.notes.find((note) => note.letter === letter)
        ? letter
        : state.letters[0];
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
  setScreen,
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

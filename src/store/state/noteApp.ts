import { Note, NoteApp } from "@/types";
import { ALPHABET } from "@/util/constants";
import { createSlice, current } from "@reduxjs/toolkit";

export const noteApp = createSlice({
  name: "noteApp",
  initialState: {
    editMode: "view",
    letters: ALPHABET,
    notes: [] as Note[],
    currentLetter: "",
    currentNote: {} as Note,
    modalOpen: false,
    menuOpen: false,
  } as NoteApp,
  reducers: {
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setLetter: (state, action) => {
      state.currentLetter = action.payload;
      state.currentNote =
        current(state.notes).find((note) => note.letter === action.payload) ??
        ({} as Note);
      state.editMode = "view";
    },
    setNote: (state, action) => {
      state.currentNote = action.payload;
      state.editMode = "view";
      if (state.menuOpen) state.menuOpen = false;
    },
    editNote: (state, action) => {
      const { id } = action.payload;

      const noteIndex = state.notes.findIndex((note) => note.id === id);

      if (noteIndex !== -1) {
        state.notes[noteIndex] = { ...action.payload };
        state.currentNote = { ...action.payload };
      }
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
      state.currentNote = { ...action.payload };
      state.currentLetter = action.payload.letter;
      state.editMode = "view";
    },
    deleteNote: (state, action) => {
      const id = action.payload;

      const noteIndex = state.notes.findIndex((note) => note.id === id);

      if (noteIndex !== -1) {
        state.notes.splice(noteIndex, 1);
        state.currentNote = {} as Note;
      }

      state.editMode = "view";
      state.currentLetter = state.notes[0]?.letter ?? "";
      state.currentNote =
        state.notes.find((note) => note.letter === state.currentLetter) ??
        ({} as Note);
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
  setEditMode,
  setLetter,
  setNote,
  editNote,
  addNote,
  deleteNote,
  toggleModal,
  toggleMenu,
} = noteApp.actions;

export const noteAppReducer = noteApp.reducer;

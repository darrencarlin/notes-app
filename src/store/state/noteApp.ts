import { Note } from "@/types";
import { ALPHABET } from "@/util/constants";
import { createSlice, current } from "@reduxjs/toolkit";

interface NoteApp {
  editMode: "edit" | "view" | "new";
  letters: string[];
  notes: Note[];
  currentLetter: string;
  currentNote: Note;
  setLetter: (letter: string) => void;
  setNote: (note: Note) => void;
  editNote: (note: Note) => void;
  setEditMode: (mode: "edit" | "view" | "new") => void;
  deleteNote: (note: Note) => void;
}

export const noteApp = createSlice({
  name: "noteApp",
  initialState: {
    editMode: "view",
    letters: ALPHABET,
    notes: [] as Note[],
    currentLetter: "",
    currentNote: {} as Note,
  },
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
  },
});

export const { setEditMode, setLetter, setNote, editNote, addNote, deleteNote } =
  noteApp.actions;

export const noteAppReducer = noteApp.reducer;

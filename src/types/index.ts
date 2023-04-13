export interface Note {
  id: string;
  title: string;
  body: string;
  letter: string;
}

export type Mode = "edit" | "view" | "new";

export interface NoteApp {
  editMode: Mode;
  letters: string[];
  notes: Note[];
  currentLetter: string;
  currentNote: Note;
  modalOpen: boolean;
  setLetter: (letter: string) => void;
  setNote: (note: Note) => void;
  editNote: (note: Note) => void;
  setEditMode: (mode: Mode) => void;
  deleteNote: (note: Note) => void;
}

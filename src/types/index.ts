export interface Note {
  id: string;
  title: string;
  body: string;
  letter: string;
}

export type Mode = "edit" | "view" | "new";

export interface NoteApp {
  userId: string;
  passcode: string;
  editMode: Mode;
  letters: string[];
  notes: Note[];
  currentLetter: string;
  currentNote: Note;
  modalOpen: boolean;
  menuOpen: boolean;
  setLetter: (letter: string) => void;
  setNote: (note: Note) => void;
  setNotes: (notes: Note[]) => void;
  editNote: (note: Note) => void;
  setEditMode: (mode: Mode) => void;
  deleteNote: (note: Note) => void;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  letter: string;
}

export const enum Mode {
  NEW_MODE = "new",
  VIEW_MODE = "view",
  EDIT_MODE = "edit",
}

export interface RootState {
  userId: string;
  passcode: string;
  editMode: Mode;
  letters: string[];
  notes: Note[];
  currentLetter: string;
  currentNote: Note;
  modalOpen: boolean;
  menuOpen: boolean;
  loading: boolean;
}

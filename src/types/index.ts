export interface Note {
  id: string;
  title: string;
  body: string;
  letter: string;
}

export type Mode = "edit" | "view" | "new";

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
}

export interface Note {
  id: string;
  title: string;
  body: string;
  letter: string;
  lastUpdated: string;
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

// Markdown

export interface Props {
  className?: string;
  inline?: boolean;
  children?: React.ReactNode;
}

export interface Node {
  type: string;
  tagName: string;

  children: Child[];
  position: Position;
}

export interface Child {
  type: string;
  value: string;
  position: Position;
}

export interface Position {
  start: End;
  end: End;
}

export interface End {
  line: number;
  column: number;
  offset: number;
}

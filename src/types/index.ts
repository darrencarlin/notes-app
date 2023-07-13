export interface Note {
  id: string;
  title: string;
  body: string;
  letter: string;
  lastUpdated: string;
}

export const enum Screen {
  HOME = "home",
  NEW = "new",
  VIEW = "view",
  EDIT = "edit",
  SETTINGS = "settings",
}

export interface Settings {
  showBookmarkUrl: boolean;
}

export interface RootState {
  userId: string;
  passcode: string;
  screen: Screen;
  letters: string[];
  notes: Note[];
  currentLetter: string;
  currentNote: Note;
  menuOpen: boolean;
  loading: boolean;
  settings: Settings;
}

export type Modals = "deleteNoteModal" | "deleteDataModal";

export interface ModalState {
  deleteNoteModal: boolean;
  deleteDataModal: boolean;
  [key: string]: boolean;
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

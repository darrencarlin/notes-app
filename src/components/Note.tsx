import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { addNote, editNote } from "@/store/state/noteApp";
import { useState, type ChangeEvent, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import Markdown from "./Markdown";
import HorizontalRule from "./HorizontalRule";

const Note: React.FC = () => {
  const [newNoteTitle, setNewNoteTitle] = useState<string>("");
  const [newNoteBody, setNewNoteBody] = useState<string>("");
  const { currentNote, editMode } = useAppSelector((state) => state.noteApp);
  const dispatch = useAppDispatch();

  const saveNote = () => {
    const note = {
      id: uuidv4(),
      title: newNoteTitle,
      body: newNoteBody,
      letter: newNoteTitle[0].toLowerCase(),
    };
    dispatch(addNote(note));
    setNewNoteTitle("");
    setNewNoteBody("");
  };

  const updateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNote = {
      id: currentNote.id,
      title: currentNote.title,
      body: e.target.value,
      letter: currentNote.letter,
    };
    dispatch(editNote(updatedNote));
  };

  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedNote = {
      id: currentNote.id,
      title: e.target.value,
      body: currentNote.body,
      letter: currentNote.letter,
    };
    dispatch(editNote(updatedNote));
  };

  if (!currentNote) return <div className="bg-gray-800 p-4 px-8">No notes!</div>;

  if (editMode === "new") {
    return (
      <div className="bg-gray-800 py-4 px-8">
        <h1 className="text-2xl font-bold mb-4">New Note</h1>
        <HorizontalRule />

        <form className="flex flex-col items-end">
          <input
            className="w-full bg-gray-700  p-4 mb-4"
            value={newNoteTitle}
            placeholder="Title"
            type="text"
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />
          <textarea
            className="w-full h-96 bg-gray-700 p-4 mb-4"
            placeholder="Body"
            value={newNoteBody}
            onChange={(e) => setNewNoteBody(e.target.value)}
          />
          <Button
            type="button"
            backgroundColor="bg-green-600"
            onClick={() => saveNote()}
            text="Save Note"
          />
        </form>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 py-4 px-8">
      {editMode !== "edit" && (
        <>
          <h1 className="text-2xl font-bold mb-4">{currentNote.title}</h1>
          <HorizontalRule />
        </>
      )}
      {editMode === "edit" ? (
        <>
          <input
            defaultValue={currentNote.title}
            className="w-full bg-gray-800 text-white border-2 border-gray-700 rounded-md p-4 mb-4"
            onChange={(e) => updateTitle(e)}
          />
          <textarea
            className="w-full h-96 bg-gray-800 text-white border-2 border-gray-700 rounded-md p-4"
            defaultValue={currentNote.body}
            onChange={(e) => updateNote(e)}
          />
        </>
      ) : (
        <Markdown markdown={currentNote.body} />
      )}
    </div>
  );
};

export default Note;

import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { addNote, deleteNote, editNote } from "@/store/state/noteApp";
import { useState, type ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import Markdown from "./Markdown";
import HorizontalRule from "./HorizontalRule";
import { checkIfObjectIsEmpty } from "@/util/functions/checkObjectIsEmpty";
import Modal from "./Modal";
import { toast } from "react-toastify";
import Input from "./inputs/Input";
import TextArea from "./inputs/TextArea";
import { callToast } from "@/util/toast";

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
    callToast("Note created ✏️");
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

  if (checkIfObjectIsEmpty(currentNote) && editMode !== "new")
    return (
      <div className="bg-gray-800 p-4 px-8">
        <h1 className="text-2xl font-bold mb-4">No Note Selected</h1>
      </div>
    );

  if (editMode === "new") {
    return (
      <div className="bg-gray-800 py-4 px-8">
        <h1 className="text-2xl font-bold mb-4">New Note</h1>
        <HorizontalRule />

        <form className="flex flex-col items-end">
          <Input
            value={newNoteTitle}
            placeholder="Title"
            type="text"
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />

          <TextArea
            placeholder="Body"
            value={newNoteBody}
            height
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
    <>
      <div className="bg-gray-800 py-4 px-8">
        test
        {editMode !== "edit" && (
          <>
            <h1 className="text-2xl font-bold mb-4">{currentNote.title}</h1>
            <HorizontalRule />
          </>
        )}
        {editMode === "edit" ? (
          <form className="grid grid-rows-[56px_1fr] h-full">
            <Input
              defaultValue={currentNote.title}
              onChange={(e) => updateTitle(e)}
            />
            <TextArea
              defaultValue={currentNote.body}
              onChange={(e) => updateNote(e)}
            />
          </form>
        ) : (
          <Markdown markdown={currentNote.body} />
        )}
      </div>
      <Modal
        title="Delete Note"
        body="Are you sure you want to delete this note? This action cannot be undone."
        action={() => {
          dispatch(deleteNote(currentNote.id));
          callToast("Note deleted 🗑️");
        }}
        actionText="Delete"
      />
    </>
  );
};

export default Note;

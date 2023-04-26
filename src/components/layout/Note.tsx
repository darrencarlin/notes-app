import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { addNote, deleteNote, editNote } from "@/store/state/noteApp";
import { checkIfObjectIsEmpty } from "@/util/functions";
import { callToast } from "@/util/toast";
import { useState } from "react";
import type { ChangeEvent, FC, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../Button";
import HorizontalRule from "../HorizontalRule";
import Markdown from "../Markdown";
import Modal from "../Modal";
import NoNotesFound from "../NoNotesFound";
import Input from "../inputs/Input";
import TextArea from "../inputs/TextArea";
import { BASE_URL, DEFAULT_HEADERS } from "@/util/constants";
import { Mode } from "@/types";
import axios from "axios";
import NoteTitle from "./NoteTitle";

const Note: FC = () => {
  const [newNoteTitle, setNewNoteTitle] = useState<string>("");
  const [newNoteBody, setNewNoteBody] = useState<string>("");
  const { currentNote, editMode, userId } = useAppSelector((state) => state.noteApp);
  const dispatch = useAppDispatch();

  const saveNote = (): void => {
    const note = {
      id: uuidv4(),
      title: newNoteTitle,
      body: newNoteBody,
      letter: newNoteTitle[0].toLowerCase(),
    };
    dispatch(addNote(note));
    setNewNoteTitle("");
    setNewNoteBody("");
    callToast("Note created ✏️", "success");
  };

  const updateNote = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ): void => {
    const updatedNote = {
      ...currentNote,
      [field]: e.target.value,
    };
    dispatch(editNote(updatedNote));
  };

  const handleDeleteNote = async (id: string): Promise<void> => {
    const response = await axios.post(
      BASE_URL + "/api/delete",
      {
        userId,
        id,
      },
      DEFAULT_HEADERS
    );

    const status = response.status;
    const { message } = response.data;

    if (status === 404) {
      return callToast(message, "warning");
    }

    if (status === 200) {
      dispatch(deleteNote(id));
      callToast(message, "success");
    } else {
      callToast(message, "warning");
    }
  };

  if (checkIfObjectIsEmpty(currentNote) && editMode !== Mode.NEW_MODE)
    return <NoNotesFound />;

  if (editMode === Mode.NEW_MODE) {
    return (
      <NoteLayout>
        <NoteTitle title="New Note" />
        <HorizontalRule />

        <form className="flex flex-col items-end">
          <Input
            label="Title"
            value={newNoteTitle}
            placeholder="Title"
            type="text"
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />

          <TextArea
            label="Body"
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
      </NoteLayout>
    );
  }

  return (
    <>
      <NoteLayout>
        {editMode !== Mode.EDIT_MODE && (
          <>
            <NoteTitle title={currentNote.title} />
            <HorizontalRule />
          </>
        )}
        {editMode === Mode.EDIT_MODE ? (
          <form className="grid grid-rows-[56px_1fr] h-full">
            <Input
              label="Title"
              defaultValue={currentNote.title}
              onChange={(e) => updateNote(e, "title")}
            />
            <TextArea
              label="Body"
              defaultValue={currentNote.body}
              onChange={(e) => updateNote(e, "body")}
            />
          </form>
        ) : (
          <Markdown markdown={currentNote.body} />
        )}
      </NoteLayout>
      <Modal
        title="Delete Note"
        body="Are you sure you want to delete this note? This action cannot be undone."
        action={async () => await handleDeleteNote(currentNote.id)}
        actionText="Delete"
      />
    </>
  );
};

const NoteLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="bg-gray-800 p-4 lg:p-8 overflow-y-scroll h-[calc(100vh-150px)] lg:h-[calc(100vh-50px)] no-scrollbar">
    {children}
  </section>
);

export default Note;

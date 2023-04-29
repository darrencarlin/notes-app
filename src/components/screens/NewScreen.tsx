import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import Button from "@/components/Button";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addNote } from "@/store/state/noteSlice";
import { useAppDispatch } from "@/store/hooks/redux";
import { callToast } from "@/util/toast";

const NewScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [newNoteTitle, setNewNoteTitle] = useState<string>("");
  const [newNoteBody, setNewNoteBody] = useState<string>("");

  const saveNote = (): void => {
    const note = {
      id: uuidv4(),
      title: newNoteTitle,
      body: newNoteBody,
      letter: newNoteTitle[0].toLowerCase(),
      lastUpdated: new Date().toISOString(),
    };
    dispatch(addNote(note));
    setNewNoteTitle("");
    setNewNoteBody("");
    callToast("Note created ✏️", "success");
  };

  return (
    <form className="flex flex-col items-end">
      <Input
        label="Title"
        value={newNoteTitle}
        placeholder="Title"
        type="text"
        maxLength={100}
        onChange={(e) => setNewNoteTitle(e.target.value)}
      />

      <TextArea
        label="Body"
        placeholder="Body"
        value={newNoteBody}
        height
        onChange={(e) => setNewNoteBody(e.target.value)}
        maxLength={50000}
      />
      <Button
        type="button"
        backgroundColor="bg-green-600"
        onClick={() => saveNote()}
        text="Save Note"
      />
    </form>
  );
};

export default NewScreen;

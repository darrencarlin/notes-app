import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { editNote } from "@/store/state/noteApp";
import type { ChangeEvent } from "react";

const EditScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { currentNote } = useAppSelector((state) => state.noteApp);

  const updateNote = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ): void => {
    const updatedNote = {
      ...currentNote,
      lastUpdated: new Date().toISOString(),
      [field]: e.target.value,
    };
    dispatch(editNote(updatedNote));
  };
  return (
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
  );
};

export default EditScreen;

import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { deleteNote, setEditMode, toggleModal } from "@/store/state/noteApp";
import Button from "./Button";

const Controls: React.FC = () => {
  const { editMode, currentNote, notes } = useAppSelector((state) => state.noteApp);
  const dispatch = useAppDispatch();

  const confirmDelete = () => {
    dispatch(toggleModal());
    // const confirm = window.confirm("Are you sure you want to delete this note?");
    // if (confirm) {
    //   dispatch(deleteNote(currentNote.id));
    // }
  };

  const noNotes = !notes.length;

  console.log({ noNotes });

  return (
    <div className="bg-gray-700 py-4 px-8 flex  justify-between gap-4 items-center">
      {editMode !== "new" && (
        <Button
          text="New Note"
          backgroundColor="bg-blue-600"
          onClick={() => dispatch(setEditMode("new"))}
        />
      )}
      {!noNotes && (
        <div className="flex gap-4">
          {editMode === "view" && (
            <Button
              backgroundColor="bg-green-600"
              onClick={() => dispatch(setEditMode("edit"))}
              text="Edit Note"
            ></Button>
          )}
          {editMode === "edit" && (
            <Button
              backgroundColor="bg-blue-600"
              onClick={() => dispatch(setEditMode("view"))}
              text="Preview Note"
            ></Button>
          )}
          {editMode === "edit" ||
            (editMode === "view" && (
              <Button
                backgroundColor="bg-red-600"
                text="Delete Note"
                onClick={() => confirmDelete()}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Controls;

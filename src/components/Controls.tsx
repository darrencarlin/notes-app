import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setEditMode, toggleModal } from "@/store/state/noteApp";
import Button from "./Button";

const Controls: React.FC = () => {
  const { editMode, notes } = useAppSelector((state) => state.noteApp);
  const dispatch = useAppDispatch();

  const noNotes = !notes.length;

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
                onClick={() => dispatch(toggleModal())}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Controls;

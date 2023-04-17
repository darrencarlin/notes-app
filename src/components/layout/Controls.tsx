import type { FC, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setEditMode, toggleModal } from "@/store/state/noteApp";
import Button from "../Button";
import useWindowWidth from "@/util/hooks/useWindowWidth";

const Controls: FC = () => {
  const { editMode, notes } = useAppSelector((state) => state.noteApp);
  const dispatch = useAppDispatch();
  const width = useWindowWidth();
  const noNotes = !notes.length;

  return (
    <ControlsLayout>
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
              text="View Note"
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
    </ControlsLayout>
  );
};

const ControlsLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="bg-gray-700 p-4 flex justify-between gap-4 items-center">
    {children}
  </section>
);

export default Controls;

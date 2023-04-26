import type { FC, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setEditMode, toggleModal } from "@/store/state/noteApp";
import Button from "../Button";
import { SlPlus, SlNote, SlTrash, SlEye, SlShare } from "react-icons/sl";
import useCopyToClipboard from "@/hooks/useCopyToClipBoard";
import { BASE_URL } from "@/util/constants";
import { Mode } from "@/types";
import { checkIfObjectIsEmpty } from "@/util/functions";

const Controls: FC = () => {
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const { editMode, notes, userId, currentNote } = useAppSelector(
    (state) => state.noteApp
  );

  const dispatch = useAppDispatch();

  const hasNotes = notes.length > 0;
  const isViewingNote = editMode === Mode.VIEW_MODE;
  const canCreateNote = editMode !== Mode.NEW_MODE;
  const canEditNote = editMode === Mode.VIEW_MODE;
  const canViewNote = editMode === Mode.EDIT_MODE;
  const canDeleteNote = [Mode.VIEW_MODE, Mode.EDIT_MODE].includes(editMode);
  const isInDefaultView = checkIfObjectIsEmpty(currentNote);

  const handleShareNote = (): void => {
    const shareLink = `${BASE_URL}/share/?userId=${userId}&noteId=${currentNote.id}`;
    copyToClipboard(shareLink);
  };

  return (
    <ControlsLayout>
      <>
        {canCreateNote && (
          <Button
            icon={<SlPlus />}
            text="New"
            backgroundColor="bg-blue-600"
            onClick={() => dispatch(setEditMode(Mode.NEW_MODE))}
          />
        )}

        {hasNotes && !isInDefaultView && (
          <div className="flex gap-4">
            {isViewingNote && (
              <Button
                icon={<SlShare />}
                text={isCopied ? "Copied" : "Share"}
                backgroundColor="bg-orange-600"
                onClick={() => handleShareNote()}
              />
            )}
            {canDeleteNote && (
              <Button
                icon={<SlTrash />}
                text="Delete"
                backgroundColor="bg-red-600"
                onClick={() => dispatch(toggleModal())}
              />
            )}
            {canEditNote && (
              <Button
                icon={<SlNote />}
                text="Edit"
                backgroundColor="bg-green-600"
                onClick={() => dispatch(setEditMode(Mode.EDIT_MODE))}
              />
            )}

            {canViewNote && (
              <Button
                icon={<SlEye />}
                text="View"
                backgroundColor="bg-blue-600"
                onClick={() => dispatch(setEditMode(Mode.VIEW_MODE))}
              />
            )}
          </div>
        )}
      </>
    </ControlsLayout>
  );
};

const ControlsLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="bg-gray-700 p-4 flex justify-between gap-4 items-center">
    {children}
  </section>
);

export default Controls;

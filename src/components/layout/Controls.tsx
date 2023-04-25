import type { FC, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setEditMode, toggleModal } from "@/store/state/noteApp";
import Button from "../Button";
import { SlPlus, SlNote, SlTrash, SlEye, SlShare } from "react-icons/sl";
import useWindowWidth from "@/hooks/useWindowWidth";
import useCopyToClipboard from "@/hooks/useCopyToClipBoard";
import { BASE_URL } from "@/util/constants";

const Controls: FC = () => {
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const { editMode, notes, userId, currentNote } = useAppSelector(
    (state) => state.noteApp
  );
  const dispatch = useAppDispatch();
  const width = useWindowWidth();

  const noNotes = !notes.length;

  return (
    <ControlsLayout>
      {editMode !== "new" && (
        <Button
          icon={width >= 425 ? <SlPlus /> : null}
          text="New Note"
          backgroundColor="bg-blue-600"
          onClick={() => dispatch(setEditMode("new"))}
        />
      )}
      {!noNotes && (
        <div className="flex gap-4">
          {editMode === "view" && (
            <Button
              icon={width >= 425 ? <SlShare /> : null}
              text={isCopied ? "Link Copied!" : "Share Note"}
              backgroundColor="bg-orange-600"
              onClick={() => {
                const shareLink = `${BASE_URL}/share/?userId=${userId}&noteId=${currentNote.id}`;
                copyToClipboard(shareLink);
              }}
            />
          )}
          {editMode === "edit" ||
            (editMode === "view" && (
              <Button
                icon={width >= 425 ? <SlTrash /> : null}
                backgroundColor="bg-red-600"
                text="Delete Note"
                onClick={() => dispatch(toggleModal())}
              />
            ))}
          {editMode === "view" && (
            <Button
              icon={width >= 425 ? <SlNote /> : null}
              backgroundColor="bg-green-600"
              onClick={() => dispatch(setEditMode("edit"))}
              text="Edit Note"
            />
          )}

          {editMode === "edit" && (
            <Button
              icon={width >= 425 ? <SlEye /> : null}
              backgroundColor="bg-blue-600"
              onClick={() => dispatch(setEditMode("view"))}
              text="View Note"
            ></Button>
          )}
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

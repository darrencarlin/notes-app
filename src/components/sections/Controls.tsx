"use client";

import Button from "@/components/Button";
import ControlsLayout from "@/components/layout/ControlsLayout";
import useCopyToClipboard from "@/hooks/useCopyToClipBoard";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { toggleModal } from "@/store/state/modalSlice";
import { setScreen } from "@/store/state/noteSlice";
import { Screen } from "@/types";
import { BASE_URL } from "@/util/constants";
import type { FC } from "react";
import {
  SlEye,
  SlNote,
  SlPlus,
  SlSettings,
  SlShare,
  SlTrash,
} from "react-icons/sl";

const Controls: FC = () => {
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const width = useWindowWidth();
  const { screen, userId, currentNote } = useAppSelector(
    (state) => state.noteSlice
  );

  const dispatch = useAppDispatch();

  const isOnViewScreen = screen === Screen.VIEW;
  const isOnHomeScreen = screen === Screen.HOME;
  const canShowCreateButton = screen !== Screen.NEW;
  const canShowEditButton = screen === Screen.VIEW;
  const canShowViewButton = screen === Screen.EDIT;
  const canShowDeleteButton = [Screen.VIEW, Screen.EDIT].includes(screen);

  const handleShareNote = (): void => {
    const shareLink = `${BASE_URL}/share/?userId=${userId}&noteId=${currentNote.id}`;
    copyToClipboard(shareLink);
  };

  return (
    <ControlsLayout>
      {canShowCreateButton && (
        <Button
          icon={<SlPlus className="group-hover:rotate-[-15deg]" />}
          text="New"
          backgroundColor="bg-blue-600"
          onClick={() => dispatch(setScreen(Screen.NEW))}
        />
      )}
      <div className="flex gap-4">
        {!isOnHomeScreen && (
          <>
            {isOnViewScreen && (
              <Button
                icon={
                  <SlShare className="group-hover:rotate-[-10deg] transition-all duration-300 ease-in-out" />
                }
                text={isCopied ? "Copied" : width > 640 ? "Share" : ""}
                backgroundColor="bg-orange-600"
                onClick={handleShareNote}
              />
            )}
            {canShowDeleteButton && (
              <Button
                icon={
                  <SlTrash className="group-hover:rotate-[-10deg] transition-all duration-300 ease-in-out" />
                }
                text={width > 640 ? "Delete" : ""}
                backgroundColor="bg-red-600"
                onClick={() => dispatch(toggleModal("deleteNoteModal"))}
              />
            )}
            {canShowEditButton && (
              <Button
                icon={
                  <SlNote className="group-hover:rotate-[-10deg] transition-all duration-300 ease-in-out" />
                }
                text={width > 640 ? "Edit" : ""}
                backgroundColor="bg-green-600"
                onClick={() => dispatch(setScreen(Screen.EDIT))}
              />
            )}

            {canShowViewButton && (
              <Button
                icon={
                  <SlEye className="group-hover:rotate-[-10deg] transition-all duration-300 ease-in-out" />
                }
                text={width > 640 ? "View" : ""}
                backgroundColor="bg-blue-600"
                onClick={() => dispatch(setScreen(Screen.VIEW))}
              />
            )}
          </>
        )}
        <Button
          icon={
            <SlSettings className="group-hover:rotate-[-15deg] transition-all duration-300 ease-in-out text-lg" />
          }
          text=""
          backgroundColor="bg-blue-600"
          onClick={() => dispatch(setScreen(Screen.SETTINGS))}
        />
      </div>
    </ControlsLayout>
  );
};

export default Controls;

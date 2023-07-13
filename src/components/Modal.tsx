"use client"

import type { FC } from "react";
import { useAppDispatch } from "@/store/hooks/redux";
import { toggleModal } from "@/store/state/modalSlice";
import React from "react";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { type Modals } from "@/types";

interface Props {
  toggle: boolean;
  modalId: Modals;
  body: string;
  action: () => void;
  actionText: string;
}

const Modal: FC<Props> = ({ toggle, modalId, body, action, actionText }) => {
  const dispatch = useAppDispatch();
  const handleModalAction = (): void => {
    action();
    dispatch(toggleModal(modalId));
  };

  return (
    <>
      {toggle && (
        <div
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-80"
          onClick={() => dispatch(toggleModal(modalId))}
          aria-hidden="true"
        />
      )}

      {toggle && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
          <div className="relative flex flex-col gap-4 p-6 bg-white rounded w-fit">
            <Text color="gray">{body}</Text>
            <div className="flex justify-end gap-4">
              <Button text="Cancel" onClick={() => dispatch(toggleModal(modalId))} />
              <Button
                backgroundColor="bg-red-600"
                text={actionText}
                onClick={() => handleModalAction()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

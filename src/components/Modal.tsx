import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { toggleModal } from "@/store/state/noteApp";
import React from "react";
import Button from "./Button";

interface Props {
  title: string;
  body: string;
  action: () => void;
  actionText: string;
}

const Modal: React.FC<Props> = ({ title, body, action, actionText }) => {
  const { modalOpen } = useAppSelector((state) => state.noteApp);
  const dispatch = useAppDispatch();

  const handleModalAction = () => {
    action();
    dispatch(toggleModal());
  };

  return (
    <>
      {modalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity"
          onClick={() => dispatch(toggleModal())}
          aria-hidden="true"
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
          <div className="relative w-fit rounded bg-white flex flex-col gap-4 p-6">
            <p className="text-gray-700">{body}</p>
            <div className="flex justify-end gap-4">
              <Button text="Cancel" onClick={() => dispatch(toggleModal())} />
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
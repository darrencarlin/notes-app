import { useEffect, useState } from "react";
import { Note } from "@/types";
import { checkStringsMatch } from "@/util/functions/checkStringsMatch";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setEditMode, setNote } from "@/store/state/noteApp";
import Button from "./Button";

const Notes: React.FC = () => {
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  const { notes, currentLetter, currentNote } = useAppSelector(
    (state) => state.noteApp
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const filteredNotes = notes.filter(
      (n) => n.title[0].toLowerCase() === currentLetter.toLowerCase()
    );
    setFilteredNotes(filteredNotes);
  }, [currentLetter, notes]);

  if (!filteredNotes.length)
    return (
      <div className="bg-gray-900 p-4 flex flex-col justify-between items-start">
        <div>
          <h3 className="font-bold">{currentLetter}</h3>
          <div>No notes!</div>
        </div>
        <Button text="Add Note" onClick={() => dispatch(setEditMode("new"))} />
      </div>
    );

  return (
    <div className="bg-gray-900 p-4 flex flex-col justify-between items-start">
      <div>
        <h3 className="font-bold mb-4">{currentLetter.toUpperCase()}</h3>
        <div className="flex flex-col items-start">
          {filteredNotes.map((n) => {
            const isActive = checkStringsMatch(currentNote?.title ?? "", n.title);
            const buttonClasses = classNames(
              {
                "bg-gray-800 rounded": isActive,
              },
              "mb-2 font-light tracking-wide p-2"
            );

            return (
              <button
                key={n.id}
                type="button"
                onClick={() => dispatch(setNote(n))}
                className={buttonClasses}
              >
                {n.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;

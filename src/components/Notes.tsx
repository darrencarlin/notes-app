import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setNote, toggleMenu } from "@/store/state/noteApp";
import { Note } from "@/types";
import { checkStringsMatch } from "@/util/functions/checkStringsMatch";
import useWindowWidth from "@/util/hooks/useWindowWidth";
import classNames from "classnames";
import { useEffect, useState } from "react";

const Notes: React.FC = () => {
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  const { notes, currentLetter, currentNote, menuOpen } = useAppSelector(
    (state) => state.noteApp
  );

  const dispatch = useAppDispatch();

  const width = useWindowWidth();

  useEffect(() => {
    const filteredNotes = notes.filter(
      (n) => n.title[0].toLowerCase() === currentLetter.toLowerCase()
    );
    setFilteredNotes(filteredNotes);
  }, [currentLetter, notes]);

  if (width < 768) {
    const classnames = classNames(
      {
        "-translate-x-full h-screen": !menuOpen,
        "block absolute transform translate-x-0 w-full h-screen ease-in-out transition-all duration-300":
          menuOpen,
      },
      "bg-gray-900 p-4 flex flex-col justify-between items-start transition-all ease-in-out delay-150"
    );

    return (
      <div className="bg-gray-900">
        <button
          className="text-white block absolute top-2 right-4 z-10"
          onClick={() => dispatch(toggleMenu())}
        >
          Menu
        </button>

        <div className={classnames}>
          <div>
            <h3 className="font-bold mb-4">{currentLetter.toUpperCase()}</h3>
            <div className="flex flex-col items-start">
              {filteredNotes.map((n) => {
                const isActive = checkStringsMatch(
                  currentNote?.title ?? "",
                  n.title
                );
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
      </div>
    );
  }

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

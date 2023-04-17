import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setNote, toggleMenu } from "@/store/state/noteApp";
import { Note } from "@/types";
import { checkStringsMatch } from "@/util/functions/checkStringsMatch";
import useWindowWidth from "@/util/hooks/useWindowWidth";
import classNames from "classnames";
import { useEffect, useState, type FC, ReactNode } from "react";
import BookmarkURL from "../BookmarkURL";

const Notes: FC = () => {
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  const { notes, currentLetter, currentNote, menuOpen, editMode } = useAppSelector(
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

  if (width < 1024) {
    const classnames = classNames(
      {
        "fixed top-[50px] left-0 transform -translate-x-full w-full h-[calc(100vh-100px)] border-y border-gray-800":
          !menuOpen,
        "fixed top-[50px] left-0 transform translate-x-0 w-full h-[calc(100vh-100px)] border-y border-gray-800":
          menuOpen,
      },
      "bg-gray-900 p-4 flex flex-col justify-between items-start ease-in-out transition-all duration-300"
    );

    return (
      <NotesLayout>
        {notes.length > 0 && (
          <button className="z-10" onClick={() => dispatch(toggleMenu())}>
            {menuOpen ? "Close" : "Open"}
          </button>
        )}

        <div className={classnames}>
          <div>
            <h3 className="font-bold mb-4 uppercase">{currentLetter}</h3>
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
                  "mb-2 font-light tracking-wide p-2 text-left"
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
          <BookmarkURL />
        </div>
      </NotesLayout>
    );
  }

  return (
    <NotesLayout>
      <div>
        <h3 className="font-bold mb-4 uppercase">{currentLetter}</h3>
        <div className="flex flex-col items-start">
          {filteredNotes.map((n) => {
            const isActive = checkStringsMatch(currentNote?.title ?? "", n.title);
            const buttonClasses = classNames(
              {
                "bg-gray-800 rounded": isActive,
              },
              "mb-2 font-light tracking-wide p-2 text-left"
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
      <BookmarkURL />
    </NotesLayout>
  );
};

const NotesLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="bg-gray-900 p-4 flex flex-col justify-between items-end lg:items-start">
    {children}
  </section>
);

export default Notes;

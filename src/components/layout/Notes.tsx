import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setNote, toggleMenu } from "@/store/state/noteApp";
import type { Note } from "@/types";
import { checkStringsMatch } from "@/util/functions";
import useWindowWidth from "@/hooks/useWindowWidth";
import classNames from "classnames";
import { useEffect, useState } from "react";
import type { ReactNode, FC } from "react";
import BookmarkURL from "../BookmarkURL";
import SearchInput from "../inputs/SearchInput";

const Title: FC<{ title: string }> = ({ title }) => (
  <h3 className="font-bold mb-4 uppercase">{title}</h3>
);

const Notes: FC = () => {
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  const { notes, currentLetter, currentNote, menuOpen } = useAppSelector(
    (state) => state.noteApp
  );

  const dispatch = useAppDispatch();

  const width = useWindowWidth();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === "") {
      setFilteredNotes(
        notes.filter((n) => n.title[0].toLowerCase() === currentLetter.toLowerCase())
      );
    } else {
      const searchedNotes = filteredNotes.filter((n) =>
        n.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredNotes(searchedNotes);
    }
  };

  useEffect(() => {
    const filteredNotes = notes.filter(
      (n) => n.title[0].toLowerCase() === currentLetter.toLowerCase()
    );
    setFilteredNotes(filteredNotes);
  }, [currentLetter, notes]);

  const hasNotes = notes.length > 0;
  const hasFilteredNotes = filteredNotes.length > 0;

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
        {hasNotes && (
          <button className="z-10" onClick={() => dispatch(toggleMenu())}>
            {menuOpen ? "Close" : "Open"}
          </button>
        )}

        <div className={classnames}>
          <div className="w-full">
            <SearchInput label="Search" handleSearch={handleSearch} />
            <Title title={currentLetter} />
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
      <div className="w-full">
        <SearchInput label="Search" handleSearch={handleSearch} />
        <Title title={currentLetter} />
        {hasFilteredNotes ? (
          <div className="flex flex-col items-start">
            {filteredNotes.map((n) => {
              const isActive = checkStringsMatch(currentNote?.title ?? "", n.title);
              const buttonClasses = classNames(
                {
                  "bg-gray-800 rounded": isActive,
                },
                "mb-2 font-light tracking-wide p-2 text-left hover:bg-gray-700 hover:shadow-md transition-all duration-300 ease-in-out hover:rounded"
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
        ) : (
          <p className="text-gray-500">No letter selected</p>
        )}
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

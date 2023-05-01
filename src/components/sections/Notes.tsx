import useWindowWidth from "@/hooks/useWindowWidth";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setNote, toggleMenu } from "@/store/state/noteSlice";
import { type Note } from "@/types";
import { checkStringsMatch } from "@/util/functions";
import classNames from "classnames";
import type { FC } from "react";
import { useEffect, useState } from "react";
import BookmarkURL from "@/components/BookmarkURL";
import Title from "@/components/Title";
import SearchInput from "@/components/inputs/SearchInput";
import NotesLayout from "@/components/layout/NotesLayout";
import { SlMenu, SlClose } from "react-icons/sl";

const Notes: FC = () => {
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  const { notes, currentLetter, currentNote, menuOpen, settings } = useAppSelector(
    (state) => state.noteSlice
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
  const hasNoteSelected = currentNote.id !== "";
  const showBookmarkUrl = settings.showBookmarkUrl;

  if (width < 1024) {
    const classnames = classNames(
      {
        "fixed top-[50px] left-0 transform -translate-x-full w-full h-[calc(100vh-100px)] border-y border-gray-800":
          !menuOpen,
        "fixed top-[50px] left-0 transform translate-x-0 w-full h-[calc(100vh-100px)] border-y border-gray-800":
          menuOpen,
      },
      "bg-gray-900 p-4 flex flex-col items-start ease-in-out transition-all duration-300"
    );

    return (
      <NotesLayout>
        {hasNotes && (
          <button className="z-10" onClick={() => dispatch(toggleMenu())}>
            {menuOpen ? <SlClose size="1.25em" /> : <SlMenu size="1.25em" />}
          </button>
        )}

        <div className={classnames}>
          <div className="flex justify-between items-center w-full">
            <Title title="Alpha Notes" color="gray" size="sm" uppercase />
            <Title title={currentLetter} size="sm" uppercase />
          </div>
          <div className="flex flex-col justify-between w-full h-full">
            <div>
              {hasNoteSelected && (
                <SearchInput label="Search" handleSearch={handleSearch} />
              )}

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
        </div>
      </NotesLayout>
    );
  }

  return (
    <NotesLayout>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <Title title="Alpha Notes" color="gray" size="sm" uppercase />
          <Title title={currentLetter} size="sm" uppercase />
        </div>
        {hasNoteSelected && (
          <SearchInput label="Search" handleSearch={handleSearch} />
        )}

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
          <p>No letter selected</p>
        )}
      </div>
      {showBookmarkUrl && <BookmarkURL />}
    </NotesLayout>
  );
};

export default Notes;

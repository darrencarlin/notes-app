"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import formatRelative from "date-fns/formatRelative";
import { setNote } from "@/store/state/noteSlice";
import Title from "@/components/Title";
import { getRecentNotes } from "@/util/functions";

const RecentNotes = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((state) => state.noteSlice);

  const recentNotes = getRecentNotes(notes)

  if (recentNotes.length === 0) return <></>;

  return (
    <>
      <Title title="You recent notes" size="sm" />
      <ul className="flex flex-col items-start mb-[50px]">
        {recentNotes.map((note) => {
          return (
            <li key={note.id} className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => dispatch(setNote(note))}
                className="p-2 font-light tracking-wide text-left transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-md hover:rounded"
              >
                {note.title}
              </button>
              <span className="text-sm text-gray-500">
                last edited {formatRelative(new Date(note.lastUpdated), new Date())}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RecentNotes;

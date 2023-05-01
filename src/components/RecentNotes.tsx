import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import formatRelative from "date-fns/formatRelative";
import { setNote } from "@/store/state/noteSlice";
import Title from "@/components/Title";

const RecentNotes = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((state) => state.noteSlice);

  const recentNotes = Array.from(notes)
    .filter((note) => {
      const date = new Date(note.lastUpdated);
      const currentDate = new Date();
      const difference = currentDate.getTime() - date.getTime();
      const differenceInDays = difference / (1000 * 3600 * 24);
      return differenceInDays <= 7;
    })
    .sort((a, b) => {
      const dateA = new Date(a.lastUpdated);
      const dateB = new Date(b.lastUpdated);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10);

  if (recentNotes.length === 0) return <></>;

  return (
    <>
      <Title title="You recent notes" size="sm" />
      <ul className="flex flex-col items-start">
        {recentNotes.map((note) => {
          return (
            <li key={note.id} className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => dispatch(setNote(note))}
                className="font-light tracking-wide text-left p-2 hover:bg-gray-700 hover:shadow-md transition-all duration-300 ease-in-out hover:rounded"
              >
                {note.title}
              </button>
              <span className="text-gray-500 text-sm">
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

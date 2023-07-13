import { useAppSelector } from "@/store/hooks/redux";
import { bookmarkUrl } from "@/util/functions";

const BookmarkURL = (): JSX.Element => {
  const { userId, passcode } = useAppSelector((state) => state.noteSlice);

  return (
    <div className="mb-4 flex flex-wrap">
      <p className="mr-2">Your unique link: </p>
      <a
        href={bookmarkUrl(userId, passcode)}
        className="flex items-center gap-2 underline font-bold text-blue-400"
      >
        Bookmark me!
      </a>
    </div>
  );
};

export default BookmarkURL;

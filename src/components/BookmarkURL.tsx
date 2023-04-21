import { useAppSelector } from "@/store/hooks/redux";
import { BASE_URL } from "@/util/constants";

const BookmarkURL = (): JSX.Element => {
  const { userId, passcode } = useAppSelector((state) => state.noteApp);

  return (
    <div className="mb-4 flex">
      <p className="mr-2">Your unique link: </p>
      <a
        href={`${BASE_URL}/?userId=${userId}&passcode=${passcode}`}
        className="flex items-center gap-2 underline font-bold text-blue-400"
      >
        Bookmark me!
      </a>
    </div>
  );
};

export default BookmarkURL;

import { useAppSelector } from "@/store/hooks/redux";
import Text from "@/components/Text";
import HorizontalRule from "@/components/HorizontalRule";
import RecentNotes from "@/components/RecentNotes";
import Title from "@/components/Title";
import { bookmarkUrl } from "@/util/functions";

const languages = [
  "tsx",
  "jsx",
  "html",
  "typescript",
  "javascript",
  "css",
  "scss",
  "python",
  "json",
  "markdown",
  "shell",
  "yaml",
];

const LanguageList = (): JSX.Element => (
  <ul className="flex flex-wrap gap-2">
    {languages.map((language) => (
      <li className="mb-2" key={language}>
        <code className="bg-gray-500 rounded p-1">{language}</code>
      </li>
    ))}
  </ul>
);

const HomeScreen = (): JSX.Element => {
  const { userId, passcode } = useAppSelector((state) => state.noteSlice);

  return (
    <>
      <Title title="Alpha Notes" size="lg" />
      <Text>
        To begin taking notes, simply choose an existing note or create a new one.
        You can easily access your notes from any location by bookmarking this{" "}
        <a
          className="hover:underline text-blue-400"
          href={bookmarkUrl(userId, passcode)}
        >
          link
        </a>
        , which is unique to you.
      </Text>

      <Text>
        It&apos;s important to note (no pun intended) that this website is intended
        for self-learning and reference purposes only. Please avoid storing any
        sensitive information within your notes.
      </Text>

      <Text>
        Notes support{" "}
        <a
          target="_blank"
          rel="noreferrer"
          className="hover:underline text-blue-400"
          href="https://www.markdownguide.org/cheat-sheet/"
        >
          markdown
        </a>{" "}
        and syntax highlighting for the following languages/file types:
      </Text>
      <LanguageList />
      <HorizontalRule />
      <RecentNotes />
    </>
  );
};

export default HomeScreen;

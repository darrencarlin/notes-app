import { useAppSelector } from "@/store/hooks/redux";
import { BASE_URL } from "@/util/constants";
import Text from "./Text";

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
];

const LanguageList = (): JSX.Element => (
  <ul className="flex gap-2">
    {languages.map((language) => (
      <li className="mb-2" key={language}>
        <code className="bg-gray-500 rounded p-1">{language}</code>
      </li>
    ))}
  </ul>
);

const NoNotesFound = (): JSX.Element => {
  const { userId, passcode } = useAppSelector((state) => state.noteApp);

  return (
    <div className="bg-gray-800 p-4 px-8">
      <h1 className="text-2xl font-bold my-4">Alpha Notes</h1>
      <Text>
        To begin taking notes, simply choose an existing note or create a new one.
        You can easily access your notes from any location by bookmarking this{" "}
        <a
          className="hover:underline text-blue-400"
          href={`${BASE_URL}/?userId=${userId}&passcode=${passcode}`}
        >
          link
        </a>
        , which is unique to you.
      </Text>

      <Text>
        It&apos;s important to note (no pun intended) that this website is intended
        for self-learning and reference purposes only. For your security, please
        avoid storing any sensitive information within your notes.
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
    </div>
  );
};

export default NoNotesFound;

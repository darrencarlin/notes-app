import { useAppSelector } from "@/store/hooks/redux";
import { BASE_URL } from "@/util/constants";
import Text from "./Text";

const NoNotesFound = (): JSX.Element => {
  const { userId, passcode } = useAppSelector((state) => state.noteApp);

  return (
    <div className="bg-gray-800 p-4 px-8">
      <h1 className="text-2xl font-bold my-4">
        No notes found, Click &apos;New Note&apos; to get started
      </h1>

      <Text>
        Bookmark this{" "}
        <a
          className="underline text-blue-400"
          href={`${BASE_URL}/?userId=${userId}&passcode=${passcode}`}
        >
          LINK
        </a>{" "}
        to access your notes from anywhere. It is unique to you.
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
        and syntax highlighting for the following languages:
      </Text>
      <ul>
        <li className="mb-2">
          TSX - <code className="bg-gray-500 rounded p-1">tsx</code>
        </li>
        <li className="mb-2">
          JSX - <code className="bg-gray-500 rounded p-1">jsx</code>
        </li>

        <li className="mb-2">
          HTML - <code className="bg-gray-500 rounded p-1">html</code>
        </li>
        <li className="mb-2">
          TypeScript - <code className="bg-gray-500 rounded p-1">typescript</code>
        </li>
        <li className="mb-2">
          JavaScript - <code className="bg-gray-500 rounded p-1">javascript</code>
        </li>
        <li className="mb-2">
          CSS - <code className="bg-gray-500 rounded p-1">css</code>
        </li>
        <li className="mb-2">
          SCSS - <code className="bg-gray-500 rounded p-1">scss</code>
        </li>
        <li className="mb-2">
          Python - <code className="bg-gray-500 rounded p-1">python</code>
        </li>
        <li className="mb-2">
          JSON - <code className="bg-gray-500 rounded p-1">json</code>
        </li>
        <li className="mb-2">
          Markdown - <code className="bg-gray-500 rounded p-1">markdown</code>
        </li>
      </ul>
    </div>
  );
};

export default NoNotesFound;

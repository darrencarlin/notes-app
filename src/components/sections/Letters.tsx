import type { FC, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setLetter } from "@/store/state/noteApp";
import { checkStringsMatch } from "@/util/functions";
import useWindowWidth from "@/hooks/useWindowWidth";
import classNames from "classnames";

const Letters: FC = () => {
  const { letters, currentLetter, notes } = useAppSelector((state) => state.noteApp);

  const dispatch = useAppDispatch();

  const width = useWindowWidth();

  if (width < 1024) {
    return (
      <LettersLayout>
        {letters.map((l) => {
          const hasNoNotes = !notes.some((n) => n.letter === l);
          const isActive = checkStringsMatch(l, currentLetter);

          const buttonClasses = classNames(
            {
              "text-gray-700": hasNoNotes,
              "text-white font-bold": !hasNoNotes,
              "cursor-default": hasNoNotes,
              "bg-gray-800 rounded": isActive,
            },
            "uppercase"
          );

          return (
            <button
              type="button"
              key={l}
              className={`${buttonClasses} `}
              onClick={() => {
                dispatch(setLetter(l));
              }}
            >
              {l}
            </button>
          );
        })}
      </LettersLayout>
    );
  }

  return (
    <LettersLayout>
      {letters.map((l) => {
        const hasNoNotes = !notes.some((n) => n.letter === l);
        const isActive = checkStringsMatch(l, currentLetter);

        const buttonClasses = classNames(
          {
            "text-gray-700": hasNoNotes,
            "text-white font-bold": !hasNoNotes,
            "cursor-default hover:bg-gray-900": hasNoNotes,
            "bg-gray-800 rounded": isActive,
          },
          "uppercase transition-all duration-100 ease-in-out hover:bg-gray-700 hover:rounded hover:shadow-md"
        );

        return (
          <button
            disabled={hasNoNotes}
            type="button"
            key={l}
            className={`${buttonClasses} `}
            onClick={() => {
              dispatch(setLetter(l));
            }}
          >
            {l}
          </button>
        );
      })}
    </LettersLayout>
  );
};

const LettersLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="no-scrollbar p-4 bg-gray-900 gap-4 overflow-x-scroll flex lg:flex-col md:justify-between md:overflow-y-scroll max-h-[100dvh]">
    {children}
  </section>
);

export default Letters;
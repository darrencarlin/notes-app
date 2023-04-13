import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setLetter } from "@/store/state/noteApp";
import { checkStringsMatch } from "@/util/functions/checkStringsMatch";

import useWindowWidth from "@/util/hooks/useWindowWidth";
import classNames from "classnames";

const Letters: React.FC = () => {
  const { letters, currentLetter, notes } = useAppSelector((state) => state.noteApp);

  const dispatch = useAppDispatch();

  const width = useWindowWidth();

  if (width < 768) {
    return (
      <div className="flex items-center gap-4 overflow-x-scroll p-4 bg-gray-900">
        {letters.map((l) => {
          const hasNoNotes = !notes.some((n) => n.letter === l);
          const isActive = checkStringsMatch(l, currentLetter);

          const buttonClasses = classNames({
            "text-gray-700": hasNoNotes,
            "text-white font-bold": !hasNoNotes,
            "cursor-default": hasNoNotes,
            "bg-gray-800 rounded": isActive,
          });

          return (
            <button
              type="button"
              key={l}
              className={`${buttonClasses} `}
              onClick={() => {
                dispatch(setLetter(l));
              }}
            >
              {l.toUpperCase()}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="no-scrollbar order-last h-10 sm:h-screen overflow-auto bg-gray-900 p-4">
      <div className="flex flex-col justify-evenly h-full no-scrollbar">
        {letters.map((l) => {
          const hasNoNotes = !notes.some((n) => n.letter === l);
          const isActive = checkStringsMatch(l, currentLetter);

          const buttonClasses = classNames({
            "text-gray-700": hasNoNotes,
            "text-white font-bold": !hasNoNotes,
            "cursor-default": hasNoNotes,
            "bg-gray-800 rounded": isActive,
          });

          return (
            <button
              type="button"
              key={l}
              className={`${buttonClasses} `}
              onClick={() => {
                dispatch(setLetter(l));
              }}
            >
              {l.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Letters;

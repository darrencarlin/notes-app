import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setLetter } from "@/store/state/noteApp";
import { checkStringsMatch } from "@/util/functions/checkStringsMatch";
import classNames from "classnames";

const Letters: React.FC = () => {
  const { letters, currentLetter, notes } = useAppSelector((state) => state.noteApp);

  const dispatch = useAppDispatch();

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

"use client"

import type { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { setLetter } from "@/store/state/noteSlice";
import { checkStringsMatch } from "@/util/functions";
import useWindowWidth from "@/hooks/useWindowWidth";
import classNames from "classnames";
import LettersLayout from "../layout/LettersLayout";

const Letters: FC = () => {
  const { letters, currentLetter, notes } = useAppSelector(
    (state) => state.noteSlice
  );

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

export default Letters;

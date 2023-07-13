"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, DEFAULT_HEADERS } from "@/util/constants";
import type { Note } from "@/types";
import { callToast } from "@/util/toast";
import { isEqual } from "underscore";
import { useAppSelector } from "@/store/hooks/redux";

interface Props {
  notes: Note[];
}

/**
 * useSyncData hook.
 * Syncs data with Firebase every 30 seconds.
 */

function useSyncData({ notes = [] }: Props): void {
  const [hasStarted, setHasStarted] = useState(false);
  const [previousNotes, setPreviousNotes] = useState<Note[]>([]);

  const { userId, passcode } = useAppSelector((state) => state.noteSlice);

  useEffect(() => {
    const syncNotesWithFirebase = async (
      newNotes: Note[]
    ): Promise<{
      status: number;
      message: string;
    }> => {
      const response = await axios.post(
        BASE_URL + "/api/sync",
        {
          notes: newNotes,
          userId,
          passcode,
        },
        DEFAULT_HEADERS
      );

      return {
        status: response.status,
        message: response.data.message,
      };
    };

    const interval = setInterval(async () => {
      if (!hasStarted) {
        setHasStarted(true);
        setPreviousNotes(notes);
        return;
      }

      const hasChanged =
        notes.length > previousNotes.length || !isEqual(notes, previousNotes);

      if (hasChanged) {
        // this makes sure that only newly updated notes are synced, deleted notes
        // are synced in the deleteNote function
        const newNotes = notes.filter(
          (note) =>
            note.lastUpdated !==
            previousNotes.find((prevNote) => prevNote.id === note.id)
              ?.lastUpdated
        );

        if (newNotes.length === 0) return;

        console.log("Syncing!");

        const { status, message } = await syncNotesWithFirebase(newNotes);

        switch (status) {
          case 200:
            setPreviousNotes(notes);
            callToast(message, "success", 2000);
            break;
          case 401:
            callToast(message, "warning", 2000);
            break;
          default:
            callToast(message, "error", 2000);
            break;
        }
      } else {
        console.log("Not Syncing!");
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [notes, userId, passcode, previousNotes, hasStarted]);
}

export default useSyncData;

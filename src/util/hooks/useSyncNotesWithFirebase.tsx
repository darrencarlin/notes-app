import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, DEFAULT_HEADERS } from "@/util/constants";
import type { Note } from "@/types";
import { callToast } from "@/util/toast";
import { isDeepEqual } from "@/util/functions";

interface Props {
  notes: Note[];
  userId: string;
  passcode: string;
}

function useSyncNotesWithFirebase({ notes, userId, passcode }: Props): void {
  const [previousNotes, setPreviousNotes] = useState<Note[]>(notes);
  useEffect(() => {
    const syncNotesWithFirebase = async (): Promise<void> => {
      await axios.post(
        BASE_URL + "/api/sync",
        {
          notes,
          userId,
          passcode,
        },
        DEFAULT_HEADERS
      );
    };

    const interval = setInterval(async () => {
      const hasNewNotes = notes.length > previousNotes.length;
      const hasChanged = !isDeepEqual(notes, previousNotes);
      if (hasNewNotes || hasChanged) {
        await syncNotesWithFirebase();
        setPreviousNotes(notes);
        callToast("Notes synced...", "success", 2000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [notes, userId, passcode, previousNotes]);
}

export default useSyncNotesWithFirebase;

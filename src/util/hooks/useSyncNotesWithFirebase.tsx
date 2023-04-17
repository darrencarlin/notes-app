import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, DEFAULT_HEADERS } from "../constants";
import { Note } from "@/types";
import { callToast } from "../toast";
import { isDeepEqual } from "../functions/deepEqual";

interface Props {
  notes: Note[];
  userId: string;
  passcode: string;
}

function useSyncNotesWithFirebase({ notes, userId, passcode }: Props) {
  const [previousNotes, setPreviousNotes] = useState<Note[]>(notes);
  useEffect(() => {
    const syncNotesWithFirebase = async () => {
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

    const interval = setInterval(() => {
      const hasNewNotes = notes.length > previousNotes.length;
      const hasChanged = !isDeepEqual(notes, previousNotes);
      if (hasNewNotes || hasChanged) {
        syncNotesWithFirebase();
        setPreviousNotes(notes);
        callToast("Notes synced...", "success", 2000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [notes, userId, passcode, previousNotes]);
}

export default useSyncNotesWithFirebase;

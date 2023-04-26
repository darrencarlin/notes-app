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
    const syncNotesWithFirebase = async (): Promise<{
      status: number;
      message: string;
    }> => {
      const response = await axios.post(
        BASE_URL + "/api/sync",
        {
          notes,
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
      const hasNewNotes = notes.length > previousNotes.length;
      const hasChanged = !isDeepEqual(notes, previousNotes);
      if (hasNewNotes || hasChanged) {
        const { status, message } = await syncNotesWithFirebase();

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
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [notes, userId, passcode, previousNotes]);
}

export default useSyncNotesWithFirebase;

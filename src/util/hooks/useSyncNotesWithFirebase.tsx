import axios from "axios";
import { useEffect } from "react";
import { BASE_URL, DEFAULT_HEADERS } from "../constants";
import { Note } from "@/types";
import { callToast } from "../toast";

interface Props {
  notes: Note[];
  userId: string;
  passcode: string;
}

function useSyncNotesWithFirebase({ notes, userId, passcode }: Props) {
  useEffect(() => {
    const syncNotesWithFirebase = async () => {
      const { status } = await axios.post(
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
      syncNotesWithFirebase();
      callToast("Notes synced...", "success", 2500);
    }, 30000);

    return () => clearInterval(interval);
  }, [notes, userId, passcode]);
}

export default useSyncNotesWithFirebase;

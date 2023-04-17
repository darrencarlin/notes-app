import axios from "axios";
import { useEffect } from "react";
import { BASE_URL, DEFAULT_HEADERS } from "../constants";
import { Note } from "@/types";

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

      if (status === 200) {
        console.log("Notes synced...");
      }
    };

    const interval = setInterval(() => {
      syncNotesWithFirebase();
    }, 30000);

    return () => clearInterval(interval);
  }, [notes, userId, passcode]);
}

export default useSyncNotesWithFirebase;

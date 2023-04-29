import { db } from "@/util/firebase/admin";
import { verifyPasscode } from "@/util/functions/verifyCredentials";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This endpoint syncs a users notes with the database. It runs every 30 seconds.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { notes, userId, passcode } = req.body;

  // validate input
  if (!notes || !userId || !passcode) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const userRef = db.collection("users").doc(userId);
    const notesRef = userRef.collection("notes");
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();

      const passcodeMatch = verifyPasscode(userData?.passcode, passcode);
      // if user exists, check if passcode matches
      if (passcodeMatch) {
        for (const note of notes) {
          await notesRef.doc(note.id).set(note, { merge: true });
        }
      } else {
        return res
          .status(401)
          .json({ message: "Not Authenticated to perform that action" });
      }
    }

    res.status(200).json({ message: "Notes Synced" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Unable to save notes. Please try again later." });
  }
}

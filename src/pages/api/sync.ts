import { db } from "@/util/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

      // if user exists, check if passcode matches
      if (userData?.passcode === passcode) {
        for (const note of notes) {
          await notesRef.doc(note.id).set(note, { merge: true });
        }
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

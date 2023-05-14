import { db } from "@/util/firebase/admin";
import { verifyPasscode } from "@/util/functions";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This endpoint deletes a single note from the database.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { id, userId, passcode } = req.body;

  // validate input
  if (!id || !userId) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const docRef = await db
      .collection("users")
      .doc(userId)
      .collection("notes")
      .doc(id)
      .get();
    if (!docRef.exists) {
      return res.status(404).json({
        message:
          "Note not found, please try again in 30 seconds giving time for the note to sync with the database",
      });
    }

    const user = docRef.data();

    const passcodeMatch = verifyPasscode(user?.passcode, passcode);

    if (passcodeMatch) {
      await db.collection("users").doc(userId).collection("notes").doc(id).delete();
      res.status(200).json({ message: "Note Deleted 🗑️" });
    }
    return res.status(401).json({ message: "Invalid passcode" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Unable to delete note. Please try again later." });
  }
}

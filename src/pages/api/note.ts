import { db } from "@/util/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This endpoint retrieves a single note from the database for sharing purposes.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { userId, noteId } = req.body;

  // validate input
  if (!userId || !noteId) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    // Get the user from the database and check if the passcode matches
    const user = await db.collection("users").doc(userId).get();

    if (!user.exists) {
      return res.status(200).json({ code: 404, message: "User not found" });
    }

    // Get all the notes from the database
    const note = await db
      .collection("users")
      .doc(userId)
      .collection("notes")
      .where("id", "==", noteId)
      .get();

    return res.status(200).json(note.docs.map((doc) => doc.data()));
  } catch (error) {
    // log error
    console.error(error);

    // send error response
    return res
      .status(500)
      .json({ message: "Unable to get note. Please try again later." });
  }
}

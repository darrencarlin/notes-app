import { db } from "@/util/firebase/admin";
import { verifyPasscode } from "@/util/functions";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This endpoint retrieves all notes from the database for a user.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: "Invalid input" });

  const userId = id.toString().split("-")[0];
  const passcode = id.toString().split("-")[1];


  // validate input
  if (!userId || !passcode) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    // Get the user from the database and check if the passcode matches
    const user = await db.collection("users").doc(userId).get();

    const passcodeMatch = verifyPasscode(user.data()?.passcode, passcode);

    if (passcodeMatch) {
      // Get all the notes from the database
      const userNotes = await db
        .collection("users")
        .doc(userId)
        .collection("notes")
        .get();

      const notes = userNotes.docs.map((doc) => doc.data());

      // Send the notes/settings to the client
      return res.status(200).json(notes);
    }
    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    // log error
    console.error(error);

    // send error response
    return res
      .status(500)
      .json({ message: "Unable to get notes. Please try again later." });
  }
}

import { db } from "@/util/firebase/admin";
import { verifyPasscode } from "@/util/functions/verifyCredentials";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This endpoint retrieves all notes from the database for a user.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { userId, passcode } = req.body;

  // validate input
  if (!userId || !passcode) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    // Get the user from the database and check if the passcode matches
    const user = await db.collection("users").doc(userId).get();
    const userPasscode = user.data()?.passcode;

    const passcodeMatch = verifyPasscode(userPasscode, passcode);

    console.log(passcodeMatch);

    if (passcodeMatch) {
      // Get all the notes from the database
      const user = await db.collection("users").doc(userId).get();

      const userData = user.data();

      const userNotes = await db
        .collection("users")
        .doc(userId)
        .collection("notes")
        .get();

      const notes = userNotes.docs.map((doc) => doc.data());

      const settings = userData?.settings;

      // Send the notes/settings to the client
      return res.status(200).json({ notes, settings });
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

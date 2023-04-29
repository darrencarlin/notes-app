import { db } from "@/util/firebase/admin";
import { verifyPasscode } from "@/util/functions/verifyCredentials";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This endpoint deletes a single note from the database.
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
    const docRef = await db.collection("users").doc(userId).get();

    if (!docRef.exists) {
      return res.status(404).json({
        message: "User not found,",
      });
    }

    const user = docRef.data();

    const passcodeMatch = verifyPasscode(user?.passcode, passcode);

    if (passcodeMatch) {
      await db.collection("users").doc(userId).delete();
      res.status(200).json({ message: "User Deleted 🗑️" });
    }
    return res.status(401).json({ message: "Invalid passcode" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Unable to delete note. Please try again later." });
  }
}

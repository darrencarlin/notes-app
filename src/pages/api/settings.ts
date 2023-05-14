import { db } from "@/util/firebase/admin";
import { verifyPasscode } from "@/util/functions";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This endpoint updates a users settings.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { userId, passcode, settings } = req.body;

  // validate input
  if (!userId || !passcode) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const docRef = await db.collection("users").doc(userId).get();

    if (!docRef.exists) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = docRef.data();

    const passcodeMatch = verifyPasscode(user?.passcode, passcode);

    if (passcodeMatch) {
      await db.collection("users").doc(userId).set({ settings }, { merge: true });
      return res.status(200).json({ message: "Settings Updated ⚙️" });
    }
    return res.status(401).json({ message: "Invalid passcode" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Unable to update settings. Please try again later." });
  }
}

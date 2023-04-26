import { db } from "@/util/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This endpoint creates a new user account. It is called when a user lands on the site for the first time.
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { userId, passcode } = req.body;

  // validate input
  if (!userId || !passcode) {
    res.status(400).json({ message: "Invalid input" });
  }

  try {
    await db.collection("users").doc(userId).set({
      passcode,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({ message: "Account Created" });
  } catch (error) {
    // log error
    console.error(error);

    // send error response
    res
      .status(500)
      .json({ message: "Unable to create account. Please try again later." });
  }
}

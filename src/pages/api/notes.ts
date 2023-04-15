import { db } from "@/util/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, passcode } = req.body;

  // validate input
  if (!userId || !passcode) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    // Get the user from the database and check if the passcode matches
    const user = await db.collection("users").doc(userId).get();

    if (!user.exists) {
      return res.status(200).json({ status: 404, message: "User not found" });
    }

    const passcodeMatch = user.data()?.passcode === passcode;

    if (passcodeMatch) {
      // Get all the notes from the database
      const notes = await db
        .collection("users")
        .doc(userId)
        .collection("notes")
        .get();
      return res.status(200).json(notes.docs.map((doc) => doc.data()));
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    // log error
    console.error(error);

    // send error response
    return res
      .status(500)
      .json({ message: "Unable to get notes. Please try again later." });
  }
}

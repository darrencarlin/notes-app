import { db } from "@/util/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get all the notes from the database
    const users = await db.collection("users").get();

    let count = 0;

    // Loop through each user
    for (const user of users.docs) {
      const userNotes = await db
        .collection("users")
        .doc(user.id)
        .collection("notes")
        .get();

      if (userNotes.empty) {
        await db.collection("users").doc(user.id).delete();
        count++;
      }
    }

    return res.status(200).json({ message: `Pruned ${count} accounts.` });
  } catch (error) {
    // log error
    console.error(error);

    // send error response
    return res
      .status(500)
      .json({ message: "Unable to prune notes. Please try again later." });
  }
}
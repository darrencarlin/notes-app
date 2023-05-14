import { db } from "@/util/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This endpoint is a cron job that prunes accounts that have no notes. It runs every 24 hours.
 */

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    // Get all the notes from the database
    const usersSnapshot = await db.collection("users").get();
    const usersToDelete = [];

    // Loop through each user
    for (const userDoc of usersSnapshot.docs) {
      const userNotesSnapshot = await db
        .collection("users")
        .doc(userDoc.id)
        .collection("notes")
        .get();

      if (userNotesSnapshot.empty) {
        usersToDelete.push(userDoc.ref);
      }
    }

    // Delete all the users in parallel using batched writes
    const batch = db.batch();
    usersToDelete.forEach((userRef) => batch.delete(userRef));
    await batch.commit();

    return res.status(200).json({ message: `Pruned ${usersToDelete.length} accounts.` });
  } catch (error) {
    // log error
    console.error(error);

    // send error response
    return res
      .status(500)
      .json({ message: "Unable to prune notes. Please try again later." });
  }
}

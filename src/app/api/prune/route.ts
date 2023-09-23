import { db } from "@/util/firebase/admin";

/**
 * This endpoint is a cron job that prunes accounts that have no notes. It runs every 24 hours.
 */

export async function GET(): Promise<Response> {
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

      // If the user has no notes, add them to the delete array
      if (userNotesSnapshot.empty) {
        usersToDelete.push(userDoc.ref);
      }
    }

    // Delete all the users in parallel using batched writes
    const batch = db.batch();
    usersToDelete.forEach((userRef) => batch.delete(userRef));
    await batch.commit();

    return new Response(
      JSON.stringify({ message: `Pruned ${usersToDelete.length} accounts.` }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        message: "Unable to prune notes. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

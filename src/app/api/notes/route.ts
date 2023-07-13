import { db } from "@/util/firebase/admin";
import { verifyPasscode } from "@/util/functions";
import type { NextRequest } from "next/server";

/**
 * This endpoint retrieves all notes from the database for a user.
 */

export async function POST(request: NextRequest): Promise<Response> {
  const { userId, passcode } = await request.json();

  // validate input
  if (!userId || !passcode) {
    return new Response(JSON.stringify({ message: "Invalid input" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // Get the user from the database and check if the passcode matches
    const userData =
      (await db.collection("users").doc(userId).get()).data() ?? {};
    const userPasscode = userData.passcode;

    const passcodeMatch = verifyPasscode(userPasscode, passcode);

    if (passcodeMatch) {
      // Get all the notes from the database
      const userNotes = await db
        .collection("users")
        .doc(userId)
        .collection("notes")
        .get();

      const notes = userNotes.docs.map((doc) => doc.data());

      const { settings } = userData;

      // Send the notes/settings to the client
      return new Response(JSON.stringify({ notes, settings }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // log error
    console.error(error);

    return new Response(
      JSON.stringify({
        message: "Unable to get notes. Please try again later.",
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

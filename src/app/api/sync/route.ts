import { db } from "@/util/firebase/admin";
import { verifyPasscode } from "@/util/functions";
import type { NextRequest } from "next/server";

/**
 * This endpoint syncs a users notes with the database. It runs every 30 seconds.
 */

export async function POST(request: NextRequest): Promise<Response> {
  const { notes, userId, passcode } = await request.json();
  // validate input
  if (!notes || !userId || !passcode) {
    return new Response(JSON.stringify({ message: "Invalid input" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const userRef = db.collection("users").doc(userId);
    const notesRef = userRef.collection("notes");
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();

      const passcodeMatch = verifyPasscode(userData?.passcode, passcode);
      // if user exists, check if passcode matches
      if (passcodeMatch) {
        for (const note of notes) {
          await notesRef.doc(note.id).set(note, { merge: true });
        }
      } else {
        return new Response(
          JSON.stringify({
            message: "Not Authenticated to perform that action",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    return new Response(JSON.stringify({ message: "Notes Synced" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // log error
    console.error(error);

    return new Response(
      JSON.stringify({
        message: "Unable to save notes. Please try again later.",
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

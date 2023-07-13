import { db } from "@/util/firebase/admin";
import type { NextRequest } from "next/server";

/**
 * This endpoint retrieves a single note from the database for sharing purposes.
 */

export async function POST(request: NextRequest): Promise<Response> {
  const { userId, noteId } = await request.json();

  // validate input
  if (!userId || !noteId) {
    return new Response(JSON.stringify({ message: "Invalid input" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // Get the user from the database and check if the passcode matches
    const user = await db.collection("users").doc(userId).get();

    if (!user.exists) {
      return new Response(JSON.stringify({ message: "User not found," }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Get all the notes from the database
    const note = await db
      .collection("users")
      .doc(userId)
      .collection("notes")
      .where("id", "==", noteId)
      .get();

    return new Response(JSON.stringify(note.docs.map((doc) => doc.data())), {
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
        message: "Unable to get note. Please try again later.",
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

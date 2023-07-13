import { db } from "@/util/firebase/admin";
import { verifyPasscode } from "@/util/functions";
import type { NextRequest } from "next/server";

/**
 * This endpoint deletes a single note from the database.
 */

export async function POST(request: NextRequest): Promise<Response> {
  const { id, userId, passcode } = await request.json();

  // validate input
  if (!id || !userId) {
    return new Response(JSON.stringify({ message: "Invalid input" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const user = (await db.collection("users").doc(userId).get()).data();

    const passcodeMatch = verifyPasscode(user?.passcode, passcode);

    if (passcodeMatch) {
      await db
        .collection("users")
        .doc(userId)
        .collection("notes")
        .doc(id)
        .delete();

      return new Response(JSON.stringify({ message: "Note Deleted 🗑️" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ message: "Invalid passcode" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        message: "Unable to delete note. Please try again later.",
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

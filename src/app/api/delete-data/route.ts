import { db } from "@/util/firebase/admin";
import { verifyPasscode } from "@/util/functions";
import type { NextRequest } from "next/server";

/**
 * This endpoint deletes a single note from the database.
 */

export async function POST(request: NextRequest): Promise<Response> {
  const { userId, passcode } = await request.json();

  if (!userId || !passcode) {
    return new Response(JSON.stringify({ message: "Invalid input" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const docRef = await db.collection("users").doc(userId).get();

    if (!docRef.exists) {
      return new Response(JSON.stringify({ message: "User not found," }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const user = docRef.data();

    const passcodeMatch = verifyPasscode(user?.passcode, passcode);

    if (passcodeMatch) {
      await db.collection("users").doc(userId).delete();

      return new Response(JSON.stringify({ message: "User Deleted 🗑️" }), {
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

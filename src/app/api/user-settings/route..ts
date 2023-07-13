import { db } from "@/util/firebase/admin";
import { verifyPasscode } from "@/util/functions";
import type { NextRequest } from "next/server";

/**
 * This endpoint updates a users settings.
 */

export async function POST(request: NextRequest): Promise<Response> {
  const { userId, passcode, settings } = await request.json();

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
    const docRef = await db.collection("users").doc(userId).get();

    if (!docRef.exists) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const user = docRef.data();

    const passcodeMatch = verifyPasscode(user?.passcode, passcode);

    if (passcodeMatch) {
      await db
        .collection("users")
        .doc(userId)
        .set({ settings }, { merge: true });

      return new Response(JSON.stringify({ message: "Settings Updated ⚙️" }), {
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
        message: "Unable to update settings. Please try again later.",
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

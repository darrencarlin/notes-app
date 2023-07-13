import { db } from "@/util/firebase/admin";
import type { NextRequest } from "next/server";

/**
 * This endpoint creates a new user account. It is called when a user lands on the site for the first time.
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
    await db.collection("users").doc(userId).set({
      passcode,
      createdAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ message: "Account Created" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        message: "Unable to create account. Please try again later.",
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

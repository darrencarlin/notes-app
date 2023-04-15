import { db } from "@/util/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, userId } = req.body;

  // validate input
  if (!id || !userId) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const docRef = await db
      .collection("users")
      .doc(userId)
      .collection("notes")
      .doc(id)
      .get();
    if (!docRef.exists) {
      return res.status(404).json({ message: "Note not found" });
    }

    await db.collection("users").doc(userId).collection("notes").doc(id).delete();
    res.status(200).json({ message: "Note Deleted 🗑️" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Unable to delete note. Please try again later." });
  }
}

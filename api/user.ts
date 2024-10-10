import { VercelRequest, VercelResponse } from "@vercel/node";
import db from "./../server/utils/db";
import type { CreateUserRequestBody } from "./../server/utils/types";

export default async function createUser(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "POST") {
    const { userId, email }: CreateUserRequestBody = req.body;

    try {
      const user = await db.user.create({
        data: {
          clerk_id: userId,
          email,
        },
      });
      return res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

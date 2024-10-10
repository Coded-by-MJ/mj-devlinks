import { VercelRequest, VercelResponse } from "@vercel/node";
import db from "./../../server/utils/db";

export default async function getUser(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const { userId } = req.query;

    console.log(userId, "i was reached");

    try {
      const user = await db.user.findUnique({
        where: {
          clerk_id: userId as string,
        },
        include: {
          socialLinks: true,
        },
      });

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to retrieve user" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

import { VercelRequest, VercelResponse } from "@vercel/node";
import db from "./../../../server/utils/db";
import type { UpdateUserInfoRequestBody } from "./../../../server/utils/types";

export default async function updateUser(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "PUT") {
    const { userId } = req.query;
    const { firstName, lastName, image }: UpdateUserInfoRequestBody = req.body;

    try {
      const user = await db.user.update({
        where: {
          clerk_id: userId as string,
        },
        data: {
          firstName,
          lastName,
          image,
        },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update user" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

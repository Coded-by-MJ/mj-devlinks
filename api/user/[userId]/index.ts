import { VercelRequest, VercelResponse } from "@vercel/node";
import db from "./../../../server/utils/db";
import type { UpdateUserInfoRequestBody } from "./../../../server/utils/types";

async function handleGetUser(req: VercelRequest, res: VercelResponse) {
  const { userId } = req.query;

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
}

async function handlePutUser(req: VercelRequest, res: VercelResponse) {
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
}

export default async (req: VercelRequest, res: VercelResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await handleGetUser(req, res);
      break;
    case "PUT":
      await handlePutUser(req, res);
      break;
    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

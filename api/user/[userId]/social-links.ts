import { VercelRequest, VercelResponse } from "@vercel/node";
import db from "./../../../server/utils/db";
import type { UpdateSocialLinksRequestBody } from "./../../../server/utils/types";

export default async function updateSocialLinks(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "PUT") {
    const { userId } = req.query;
    const { socialLinks }: UpdateSocialLinksRequestBody = req.body;

    try {
      await db.socialLink.deleteMany({
        where: {
          clerk_id: userId as string,
        },
      });

      const createdLinks = await db.socialLink.createMany({
        data: socialLinks.map((link) => ({
          url: link.url,
          name: link.name,
          clerk_id: userId as string,
        })),
      });

      return res.status(200).json(createdLinks);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update social links" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

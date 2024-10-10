import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import db from "./utils/db";
import type {
  CreateUserRequestBody,
  UpdateUserInfoRequestBody,
  UpdateSocialLinksRequestBody,
  SocialLink,
} from "./utils/types";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello From Server...</h1>");
});

//Create Actions
app.post(
  "/user",
  async (req: Request<{}, {}, CreateUserRequestBody>, res: Response) => {
    const { userId, email } = req.body;

    try {
      const user = await db.user.create({
        data: {
          clerk_id: userId,
          email,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }
);

// Read Actions

app.get(
  "/user/:userId",
  async (req: Request<{ userId: string }, {}, {}>, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await db.user.findUnique({
        where: {
          clerk_id: userId,
        },
        include: {
          socialLinks: true,
        },
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve user" });
    }
  }
);

// Update Actions
app.put(
  "/user/:userId",
  async (
    req: Request<{ userId: string }, {}, UpdateUserInfoRequestBody>,
    res: Response
  ) => {
    const { userId } = req.params;
    const { firstName, lastName, image } = req.body;

    try {
      const user = await db.user.update({
        where: {
          clerk_id: userId,
        },
        data: {
          firstName,
          lastName,
          image,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }
);

app.put(
  "/user/:userId/social-links",
  async (
    req: Request<{ userId: string }, {}, UpdateSocialLinksRequestBody>,
    res: Response
  ) => {
    const { userId } = req.params;
    const { socialLinks } = req.body;

    try {
      await db.socialLink.deleteMany({
        where: {
          clerk_id: userId,
        },
      });

      const createdLinks = await db.socialLink.createMany({
        data: socialLinks.map((link) => ({
          url: link.url,
          name: link.name,
          clerk_id: userId,
        })),
      });

      res.status(200).json(createdLinks);
    } catch (error) {
      res.status(500).json({ error: "Failed to update social links" });
    }
  }
);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route does not exist" });
});

const startApp = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startApp();

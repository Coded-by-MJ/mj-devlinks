import asyncHandler from "../middleware/asyncHandler";
import db from "../utils/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AuthInfoRequest } from "../utils/types";
import jwt from "jsonwebtoken";
import {
  UpdateSocialLinksRequest,
  UpdateUserInfoRequest,
} from "../utils/types";

const createUserInDB = asyncHandler(
  async (req: AuthInfoRequest, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("please include all fields");
    }
    //Find if user already exists

    const userExists = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      include: {
        socialLinks: true,
      },
    });
    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      email: user.email,
      socialLinks: user.socialLinks,
      token: generateToken(user.id),
    });
  }
);

const resetUserPassword = asyncHandler(
  async (req: AuthInfoRequest, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("please include all fields");
    }
    //Find if user already exists

    const userExists = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExists) {
      res.status(400);
      throw new Error("No account associated with this email, please sign-up");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
      include: {
        socialLinks: true,
      },
    });
    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      email: user.email,
      socialLinks: user.socialLinks,
      token: generateToken(user.id),
    });
  }
);

const loginUser = asyncHandler(async (req: AuthInfoRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await db.user.findUnique({
    where: {
      email,
    },
    include: {
      socialLinks: true,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      email: user.email,
      socialLinks: user.socialLinks,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const generateToken = (id: string) => {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

const getUserFromDB = asyncHandler(async (req: Request, res: Response) => {
  const userId: string = req.params.id;

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      lastName: true,
      firstName: true,
      email: true,
      image: true,
      socialLinks: true,
    },
  });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found in Database");
  }
});

const updateUserInDB = asyncHandler(
  async (req: UpdateUserInfoRequest, res: Response) => {
    const userId: string = req.cookies.userId;
    const { firstName, lastName, image } = req.body;

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        image,
      },
    });
    res.status(200).json(user);
  }
);

const updateUserSocialLinksInDB = asyncHandler(
  async (req: UpdateSocialLinksRequest, res: Response) => {
    const userId: string = req.cookies.userId;
    const { socialLinks } = req.body;

    await db.socialLink.deleteMany({
      where: {
        userId,
      },
    });
    const newSocialLinks = await db.socialLink.createMany({
      data: socialLinks.map((link) => ({
        url: link.url,
        name: link.name,
        userId,
      })),
    });
    res.status(201).json(newSocialLinks);
  }
);

export {
  getUserFromDB,
  updateUserInDB,
  loginUser,
  createUserInDB,
  updateUserSocialLinksInDB,
  resetUserPassword,
};

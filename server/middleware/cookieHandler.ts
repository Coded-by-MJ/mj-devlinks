import asyncHandler from "./asyncHandler";
import { Request, Response, NextFunction } from "express";

const cookieHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.cookies?.userId;

    if (!userId) {
      res.status(401);
      throw new Error("UserId not found in cookies");
    }

    next();
  }
);

export default cookieHandler;

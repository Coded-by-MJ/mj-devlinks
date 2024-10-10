import { redirect } from "@tanstack/react-router";

export const authLoader =
  (isSignedIn: boolean | undefined, userId: string | null | undefined) =>
  () => {
    if (!isSignedIn && !userId) {
      return null;
    }
    redirect({
      to: "/user",
      throw: true,
    });
  };

export const userLoader =
  (isSignedIn: boolean | undefined, userId: string | null | undefined) =>
  async () => {
    if (isSignedIn && userId) {
      return {
        userId,
      };
    }
    redirect({
      to: "/",
      throw: true,
    });
  };

import { toast } from "@/hooks/use-toast";
import { redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const authLoader = () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  if (userId && token) {
    redirect({
      to: "/user",
      throw: true,
    });
  }
  return null;
};

export const userLoader = () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  if (!token && !userId) {
    toast({
      description: "Authentication Session Expired",
      variant: "destructive",
    });
    redirect({
      to: "/",
      throw: true,
    });
  }
  return userId;
};

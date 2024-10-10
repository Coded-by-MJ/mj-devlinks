import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import axios from "axios";
import type {
  CreateUserRequestBody,
  UpdateUserInfoRequestBody,
  UpdateSocialLinksRequestBody,
  GetUserResponseData,
} from "@/utils/types";
import { toast } from "@/hooks/use-toast";

export const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "an error occurred",
  };
};

export const renderAuthError = (error: unknown): { message: string } => {
  console.log(error);
  if (isClerkAPIResponseError(error)) {
    const errorsArr = error.errors.map((error) => error.longMessage);
    return {
      message: errorsArr.join(", "),
    };
  } else {
    return {
      message: "there was an error",
    };
  }
};

export const createUser = async ({ userId, email }: CreateUserRequestBody) => {
  try {
    await axios.post("/api/user", {
      userId,
      email,
    });

    toast({
      description: "Sign up Successful ✅",
    });
  } catch (error) {
    console.log(error);
    const message: string =
      axios.isAxiosError(error) && error.response
        ? error.response.data.error
        : "An error occurred while fetching user data.";

    toast({
      description: message,
      variant: "destructive",
    });
  }
};

export const getUser = async (
  userId: string
): Promise<GetUserResponseData | { message: string }> => {
  try {
    const res = await axios.get<GetUserResponseData>(`/api/user/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    const message: string =
      axios.isAxiosError(error) && error.response
        ? error.response.data.error
        : "An error occurred while fetching user data.";

    toast({
      description: message,
      variant: "destructive",
    });
    return {
      message,
    };
  }
};

export const updateUserProfileInfo = async (
  userId: string,
  { firstName, lastName, image }: UpdateUserInfoRequestBody
) => {
  try {
    const res = await axios.put(`/api/user/${userId}`, {
      firstName,
      lastName,
      image,
    });

    toast({
      description: "Profile Updated ✅",
    });
    return res.data;
  } catch (error) {
    console.log(error);
    const message: string =
      axios.isAxiosError(error) && error.response
        ? error.response.data.error
        : "An error occurred while updating user info.";

    toast({
      description: message,
      variant: "destructive",
    });
  }
};

export const updateUserSocialLinks = async (
  userId: string,
  { socialLinks }: UpdateSocialLinksRequestBody
) => {
  try {
    const res = await axios.put(`/api/user/${userId}/social-links`, {
      socialLinks,
    });

    toast({
      description: "Links Updated✅",
    });
    return res.data;
  } catch (error) {
    console.log(error);
    const message: string =
      axios.isAxiosError(error) && error.response
        ? error.response.data.error
        : "An error occurred while update user social links.";

    toast({
      description: message,
      variant: "destructive",
    });
  }
};

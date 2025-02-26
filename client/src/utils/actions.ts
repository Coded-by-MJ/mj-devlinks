import axios from "axios";
import type {
  AuthRequestBody,
  UpdateUserInfoRequestBody,
  UpdateSocialLinksRequestBody,
  GetUserResponseData,
  AuthResponseBody,
} from "@/utils/types";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

export const renderError = (error: unknown): { message: string } => {
  console.log(error);
  const message: string =
    axios.isAxiosError(error) && error.response
      ? error.response.data.message
      : error instanceof Error
      ? error.message
      : String(error);
  return {
    message: message,
  };
};

const fetchCookies = () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("token");
  if (!token || !userId) {
    throw new Error("cookies not found");
  }
};

export const createUser = async ({
  email,
  password,
}: AuthRequestBody): Promise<AuthResponseBody> => {
  const formData = new URLSearchParams();
  formData.append("email", email);
  formData.append("password", password);

  const { data } = await axios.post<AuthResponseBody>(
    `${import.meta.env.VITE_API_URL}/api/users/sign-up`,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const { token, id: userId } = data;
  if (!token || !userId) {
    throw new Error("Unable to create an account, please try again later");
  }
  Cookies.set("token", token, {
    sameSite: "strict",
    secure: true,
    expires: 7,
  });
  Cookies.set("userId", userId, {
    sameSite: "strict",
    secure: true,
    expires: 7,
  });

  return data;
};

export const loginUser = async ({
  email,
  password,
}: AuthRequestBody): Promise<AuthResponseBody> => {
  const formData = new URLSearchParams();
  formData.append("email", email);
  formData.append("password", password);

  const { data } = await axios.post<AuthResponseBody>(
    `${import.meta.env.VITE_API_URL}/api/users/login`,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { token, id: userId } = data;
  if (!token || !userId) {
    throw new Error("Unable to login your account, please try again later");
  }
  Cookies.set("token", token, {
    sameSite: "strict",
    secure: true,
    expires: 7,
  });
  Cookies.set("userId", userId, {
    sameSite: "strict",
    secure: true,
    expires: 7,
  });
  return data;
};

export const resetUserPassword = async ({
  email,
  password,
}: AuthRequestBody): Promise<AuthResponseBody> => {
  const formData = new URLSearchParams();
  formData.append("email", email);
  formData.append("password", password);

  const { data } = await axios.post<AuthResponseBody>(
    `${import.meta.env.VITE_API_URL}/api/users/reset`,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { token, id: userId } = data;
  if (!token || !userId) {
    throw new Error("Unable to reset your password, please try again later");
  }
  Cookies.set("token", token, {
    sameSite: "strict",
    secure: true,
    expires: 7,
  });
  Cookies.set("userId", userId, {
    sameSite: "strict",
    secure: true,
    expires: 7,
  });
  return data;
};

export const getUser = async (
  optionalId?: string
): Promise<GetUserResponseData | { message: string }> => {
  try {
    const userId = Cookies.get("userId") || optionalId;
    if (!userId) {
      throw new Error("Please provide a user ID");
    }
    const { data } = await axios.get<GetUserResponseData>(
      `${import.meta.env.VITE_API_URL}/api/users/${userId}`
    );

    return data;
  } catch (error) {
    const { message } = renderError(error);
    toast({
      description: message,
      variant: "destructive",
    });

    return {
      message,
    };
  }
};

export const updateUserProfileInfo = async ({
  firstName,
  lastName,
  image,
}: UpdateUserInfoRequestBody) => {
  try {
    fetchCookies();
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/users`,
      {
        firstName,
        lastName,
        image,
      },
      {
        withCredentials: true,
      }
    );

    toast({
      description: "Profile Updated ✅",
    });
    return res.data;
  } catch (error) {
    const { message } = renderError(error);

    toast({
      description: message,
      variant: "destructive",
    });
  }
};

export const updateUserSocialLinks = async ({
  socialLinks,
}: UpdateSocialLinksRequestBody) => {
  try {
    fetchCookies();
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/social-links`,
      {
        socialLinks,
      },
      {
        withCredentials: true,
      }
    );
    toast({
      description: "Links Updated✅",
    });
    return res.data;
  } catch (error) {
    const { message } = renderError(error);

    toast({
      description: message,
      variant: "destructive",
    });
  }
};

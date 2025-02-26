export type AuthFormProps = {
  heading: string;
  desc: string;
  type: "login" | "reset" | "register";
  link: string;
  linkText: string;
  suggestion?: string;
};

export type SocialLink = {
  id: string;
  name: string;
  url: string;
};

export type UserState = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  socialLinks: SocialLink[];
};

export type UserInputField =
  | "userId"
  | "firstName"
  | "lastName"
  | "email"
  | "image";

export type UserInfoField = {
  field: UserInputField;
  value: string;
};

export interface AuthRequestBody {
  password: string;
  email: string;
}
export interface AuthResponseBody {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  socialLinks: SocialLink[];
  token: string;
}

export interface UpdateUserInfoRequestBody {
  firstName: string;
  lastName: string;
  image: string;
}

export interface UpdateSocialLinksRequestBody {
  socialLinks: SocialLink[];
}

export interface GetUserResponseData {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  image: string;
  socialLinks: SocialLink[];
}

export type SaveButtonProps =
  | "saveUserInfoFunction"
  | "saveUserSocialLinksFunction";

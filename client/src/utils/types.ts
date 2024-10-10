export type AuthFormProps = {
  heading: string;
  desc: string;
  type: string;
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

export interface CreateUserRequestBody {
  userId: string;
  email: string;
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
  clerk_id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  socialLinks: UserSocialLinkResponseData[];
}

interface UserSocialLinkResponseData {
  id: string;
  url: string;
  name: string;
  clerk_id: string;
  user: GetUserResponseData;
}

export type SaveButtonProps =
  | "saveUserInfoFunction"
  | "saveUserSocialLinksFunction";

import { Request } from "express";

export interface SocialLink {
  id: string;
  url: string;
  name: string;
}

export interface AuthInfoRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
export interface GetUserInfoRequest extends Request {
  userId: string;
}

export interface UpdateUserInfoRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    image: string;
  };
}

export interface UpdateSocialLinksRequest extends Request {
  body: {
    socialLinks: SocialLink[];
  };
}

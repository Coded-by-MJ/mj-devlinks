export interface SocialLink {
  id: string;
  url: string;
  name: string;
}

export interface AuthInfoRequest {
  email: string;
  password: string;
}

export interface UpdateUserInfoRequest {
  firstName: string;
  lastName: string;
  image: string;
}

export interface UpdateSocialLinksRequest {
  socialLinks: SocialLink[];
}

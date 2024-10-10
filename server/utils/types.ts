export interface SocialLink {
  id: string;
  url: string;
  name: string;
}

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

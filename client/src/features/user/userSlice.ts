import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import type { UserState, SocialLink, UserInfoField } from "@/utils/types";

const initialState: UserState = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  socialLinks: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addLink: (state) => {
      state.socialLinks.push({
        id: nanoid(),
        name: "Github",
        url: "",
      });
    },
    updateLink: (
      state,
      action: PayloadAction<{
        id: string;
        field: "name" | "url";
        value: string;
      }>
    ) => {
      const matchedLink = state.socialLinks.find(
        (link) => link.id === action.payload.id
      );
      if (matchedLink) {
        matchedLink[action.payload.field] = action.payload.value;
      } else {
        throw new Error("Could not find the social link,  Please check ID");
      }
    },
    deleteLink: (state, action: PayloadAction<{ id: string }>) => {
      state.socialLinks = state.socialLinks.filter(
        (link) => link.id !== action.payload.id
      );
    },
    updateUserSocialLinks: (
      state,
      action: PayloadAction<{ newOrder: SocialLink[] }>
    ) => {
      state.socialLinks = action.payload.newOrder;
    },
    updateUserInfo: (state, action: PayloadAction<UserInfoField>) => {
      state[action.payload.field] = action.payload.value;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  addLink,
  updateLink,
  deleteLink,
  updateUserSocialLinks,
  updateUserInfo,
  setUser,
} = userSlice.actions;

export default userSlice.reducer;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileInfo, updateUserSocialLinks } from "@/utils/actions";
import { useAppSelector } from "./redux-hooks";

import { getProfileUrl } from "@/utils/helpers";
import { toast } from "./use-toast";

export const useSaveUserInfo = () => {
  const queryClient = useQueryClient();
  const user = useAppSelector((store) => store.user);

  const { mutate: saveUserProfile, isPending: isPendingInfo } = useMutation({
    mutationFn: () =>
      updateUserProfileInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["User"] });
    },
  });

  return {
    saveUserProfile,
    isPendingInfo,
  };
};

export const useSaveUserSocialLinks = () => {
  const queryClient = useQueryClient();
  const user = useAppSelector((store) => store.user);

  const verifyUserLinks = () => {
    let isValid = true;
    user.socialLinks.map((link) => {
      const profileUrl = getProfileUrl(link.name);
      if (link.url.length <= profileUrl.length) {
        toast({
          description: `Please provide a valid ${link.name} URL starting with ${profileUrl}`,
          variant: "destructive",
        });

        isValid = false;
      }
    });

    return isValid;
  };

  const { mutate: saveUserSocialLinks, isPending: isPendingLinks } =
    useMutation({
      mutationFn: () =>
        updateUserSocialLinks({
          socialLinks: user.socialLinks,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["User"] });
      },
    });

  return {
    saveUserSocialLinks,
    isPendingLinks,
    verifyUserLinks,
  };
};

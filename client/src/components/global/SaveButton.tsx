import { Button } from "../ui/button";
import { SaveButtonProps } from "@/utils/types";

import {
  useSaveUserInfo,
  useSaveUserSocialLinks,
} from "@/hooks/react-query-hooks";
import { LiaSpinnerSolid } from "react-icons/lia";

function SaveButton({ functionName }: { functionName: SaveButtonProps }) {
  const { saveUserProfile, isPendingInfo } = useSaveUserInfo();
  const { saveUserSocialLinks, isPendingLinks, verifyUserLinks } =
    useSaveUserSocialLinks();

  const handleSaveData = () => {
    if (functionName === "saveUserSocialLinksFunction") {
      const isValid = verifyUserLinks();
      if (isValid) {
        saveUserSocialLinks();
      }
    } else {
      saveUserProfile();
    }
  };

  return (
    <Button
      type="button"
      disabled={isPendingInfo || isPendingLinks}
      onClick={handleSaveData}
      className="text-white bg-main max-md:w-full transition-colors  px-6 py-3 hover:bg-main-shade rounded-md"
    >
      {isPendingInfo || isPendingLinks ? (
        <LiaSpinnerSolid className="animate-spin" />
      ) : (
        "Save"
      )}
    </Button>
  );
}
export default SaveButton;

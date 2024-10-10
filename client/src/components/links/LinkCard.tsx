import { LinkLine } from "../global/Icons";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { getCorrespondingLogo, getProfileUrl } from "@/utils/helpers";
import { socialPlatforms } from "./socialPlatforms";
import DropdownOption from "./DropdownOption";
import { HiOutlineLink } from "react-icons/hi";
import { Label } from "../ui/label";
import { toast } from "@/hooks/use-toast";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateLink, deleteLink } from "@/features/user/userSlice";
import { useAppDispatch } from "@/hooks/redux-hooks";

function LinkCard({
  id,
  content,
  number,
}: {
  id: string;
  content: {
    id: string;
    name: string;
    url: string;
  };
  number: number;
}) {
  const { name, url } = content;
  const [platform, setPlatform] = useState<string>(name);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [linkUrl, setLinkUrl] = useState<string>(
    url || getProfileUrl(platform)
  );
  const dispatch = useAppDispatch();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDropdown = useCallback(() => {
    setOpenDropDown((prev) => !prev);
  }, []);

  const handleSelectedPlatform = useCallback(
    (newPlatform: string) => {
      setPlatform(newPlatform);
      setLinkUrl(getProfileUrl(newPlatform));
      dispatch(updateLink({ id, field: "name", value: newPlatform }));
    },
    [id, dispatch]
  );

  function handleUpdateLinkUrl(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const profileUrl = getProfileUrl(platform); // Check if platform URL exists

    if (!profileUrl) {
      toast({
        description: `Unknown platform: ${platform}`,
        variant: "destructive",
      });
      return;
    }
    if (!value.startsWith(profileUrl)) {
      toast({
        description: `Please provide a valid ${platform} URL starting with ${profileUrl}`,
        variant: "destructive",
      });
    } else {
      setLinkUrl(value);
      dispatch(updateLink({ id, field: "url", value }));
    }
  }

  const handleDeleteLink = () => {
    dispatch(deleteLink({ id }));
  };

  return (
    <div
      className="flex flex-col p-5 gap-3 w-full"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className="flex justify-between items-center">
        <button
          {...listeners}
          className="inline-flex cursor-grab gap-2 text-sm text-main-gray font-bold items-center"
        >
          <LinkLine />
          Link #{number}
        </button>
        <button onClick={handleDeleteLink} className="text-main-gray text-sm">
          Remove
        </button>
      </div>
      {/* Select Dropdown */}
      <div className="w-full flex-col gap-10">
        <span className="inline-block text-[12px] text-main-gray">
          Platform
        </span>

        <div className="relative">
          <button
            onClick={handleDropdown}
            type="button"
            className="w-full hover:bg-white bg-white flex justify-between items-center text-main-gray group transition-all cursor-pointer hover:shadow-md hover:ring-main-shade hover:ring hover:shadow-main-shade h-[46px] rounded-sm border border-main-gray py-2 px-3 hover:border-main"
          >
            <p className="inline-flex gap-3 items-center">
              {getCorrespondingLogo(
                platform,
                "group-hover:text-main transition-all text-main-gray"
              )}
              <span className="group-hover:text-main text-sm text-gray">
                {platform}
              </span>
            </p>

            <MdKeyboardArrowDown
              className={cn(
                "size-6 text-main transition-transform",
                openDropDown && "rotate-180"
              )}
            />
          </button>
          {/* dropdown options */}
          {openDropDown && (
            <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-main scrollbar-track-main-lgray absolute z-50 flex flex-col gap-[1.2rem] animate-in fade-in zoom-in top-[4rem] h-[30rem] overflow-y-scroll transition-opacity bg-white rounded-[8px] shadow-md shadow-main-lgray p-3 w-full ">
              {socialPlatforms.map((platform) => (
                <DropdownOption
                  {...platform}
                  key={platform.name}
                  handleDropDown={handleDropdown}
                  handleSelectedPlatform={handleSelectedPlatform}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* url input */}
      <div className="w-full flex-col gap-10">
        <Label
          htmlFor="input"
          className="inline-block text-[12px] text-main-gray"
        >
          Link
        </Label>

        <div className="w-full group gap-3  flex items-center text-main-gray  transition-all cursor-pointer hover:shadow-md hover:ring-main-shade focus-within:ring focus-within:shadow-main-shade focus-within:border-main hover:ring hover:shadow-main-shade h-[46px] rounded-sm border border-main-gray py-2 px-3 hover:border-main">
          <HiOutlineLink className="group-focus:text-main group-hover:text-main transition-all" />
          <input
            name="input"
            type="text"
            value={linkUrl}
            onChange={handleUpdateLinkUrl}
            className="text-main-gray text-sm flex-1 border-none focus:border-none focus:outline-none"
          ></input>
        </div>
      </div>
    </div>
  );
}
export default LinkCard;

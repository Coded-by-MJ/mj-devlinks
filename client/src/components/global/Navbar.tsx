import UserLinks from "./UserLinks";
import Logo from "./Logo";
import { Link, useLoaderData } from "@tanstack/react-router";
import SignOutLink from "../auth/SignOutLink";
import { IoMdEye } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { renderError } from "@/utils/actions";
import { toast } from "@/hooks/use-toast";

function Navbar() {
  return (
    <nav className="bg-white relative z-10 rounded-sm flex items-center md:p-4 p-6 justify-between">
      <Logo className="w-[145px] h-[32px] object-cover hidden md:block" />
      <MobileLogo />
      <UserLinks />
      <div className="flex items-center gap-3">
        <SignOutLink />
        <Link
          to={"/user/preview"}
          className="font-semibold md:px-6 py-3 px-4  border border-main justify-center group transition-all hover:bg-main-light  text-sm capitalize rounded-md text-main flex items-center gap-2 bg-white"
        >
          <IoMdEye className="md:hidden text-main size-5" />
          <span className="hidden md:inline-block">Preview</span>
        </Link>
      </div>
    </nav>
  );
}

export const PreviewNavbar = () => {
  const { userId } = useLoaderData({
    from: "/user",
  });

  const shareData = {
    title: "Devlinks",
    text: "My Devlinks Profile",
    url: `${import.meta.env.VITE_WEBSITE_URL}/share/${userId}`,
  };

  const handleShare = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      const errMsg = renderError(err);
      toast({
        description: errMsg.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white relative z-10 rounded-sm flex items-center md:p-4 p-6 justify-between">
      <Button
        asChild
        className="text-main px-[27px] py-[11px]  hover:bg-main-light h-[46px] transition-all shadow-none font-semibold bg-white border-main border text-sm"
      >
        <Link to={"/user"}>Back to Editor</Link>
      </Button>
      <Button
        onClick={handleShare}
        className="text-white h-[46px] hover:bg-main-shade hover:text-main  transition-all  px-[27px] py-[11px] capitalize font-semibold bg-main shadow-none border-none text-sm"
      >
        share link
      </Button>
    </nav>
  );
};

const MobileLogo = () => {
  return (
    <svg
      className="md:hidden flex-shrink-0"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.6185 27.3798C6.57317 29.3332 9.7145 29.3332 15.9998 29.3332C22.2852 29.3332 25.4278 29.3332 27.3798 27.3798C29.3332 25.4292 29.3332 22.2852 29.3332 15.9998C29.3332 9.7145 29.3332 6.57184 27.3798 4.6185C25.4292 2.6665 22.2852 2.6665 15.9998 2.6665C9.7145 2.6665 6.57184 2.6665 4.6185 4.6185C2.6665 6.57317 2.6665 9.7145 2.6665 15.9998C2.6665 22.2852 2.6665 25.4278 4.6185 27.3798ZM12.6665 11.6665C11.8095 11.6665 10.9716 11.9206 10.259 12.3968C9.54642 12.873 8.99101 13.5497 8.66303 14.3415C8.33505 15.1334 8.24923 16.0046 8.41643 16.8452C8.58364 17.6858 8.99635 18.4579 9.60237 19.064C10.2084 19.67 10.9805 20.0827 11.8211 20.2499C12.6617 20.4171 13.533 20.3313 14.3248 20.0033C15.1166 19.6753 15.7934 19.1199 16.2695 18.4073C16.7457 17.6947 16.9998 16.8569 16.9998 15.9998C16.9998 15.7346 17.1052 15.4803 17.2927 15.2927C17.4803 15.1052 17.7346 14.9998 17.9998 14.9998C18.2651 14.9998 18.5194 15.1052 18.7069 15.2927C18.8945 15.4803 18.9998 15.7346 18.9998 15.9998C18.9998 17.2525 18.6284 18.4769 17.9325 19.5184C17.2366 20.56 16.2474 21.3717 15.0902 21.8511C13.9329 22.3304 12.6595 22.4558 11.4309 22.2115C10.2024 21.9671 9.07389 21.3639 8.18816 20.4782C7.30243 19.5924 6.69924 18.464 6.45486 17.2354C6.21049 16.0069 6.33591 14.7334 6.81527 13.5762C7.29462 12.4189 8.10638 11.4298 9.14789 10.7339C10.1894 10.0379 11.4139 9.6665 12.6665 9.6665C12.9317 9.6665 13.1861 9.77186 13.3736 9.9594C13.5611 10.1469 13.6665 10.4013 13.6665 10.6665C13.6665 10.9317 13.5611 11.1861 13.3736 11.3736C13.1861 11.5611 12.9317 11.6665 12.6665 11.6665ZM23.6665 15.9998C23.6665 17.1491 23.21 18.2513 22.3973 19.064C21.5846 19.8766 20.4824 20.3332 19.3332 20.3332C19.068 20.3332 18.8136 20.4385 18.6261 20.6261C18.4385 20.8136 18.3332 21.068 18.3332 21.3332C18.3332 21.5984 18.4385 21.8527 18.6261 22.0403C18.8136 22.2278 19.068 22.3332 19.3332 22.3332C20.5858 22.3332 21.8103 21.9617 22.8518 21.2658C23.8933 20.5699 24.7051 19.5808 25.1844 18.4235C25.6638 17.2662 25.7892 15.9928 25.5448 14.7643C25.3004 13.5357 24.6972 12.4072 23.8115 11.5215C22.9258 10.6358 21.7973 10.0326 20.5687 9.7882C19.3402 9.54382 18.0668 9.66924 16.9095 10.1486C15.7522 10.628 14.7631 11.4397 14.0672 12.4812C13.3713 13.5227 12.9998 14.7472 12.9998 15.9998C12.9998 16.2651 13.1052 16.5194 13.2927 16.7069C13.4803 16.8945 13.7346 16.9998 13.9998 16.9998C14.2651 16.9998 14.5194 16.8945 14.7069 16.7069C14.8945 16.5194 14.9998 16.2651 14.9998 15.9998C14.9998 14.8506 15.4564 13.7484 16.269 12.9357C17.0817 12.123 18.1839 11.6665 19.3332 11.6665C20.4824 11.6665 21.5846 12.123 22.3973 12.9357C23.21 13.7484 23.6665 14.8506 23.6665 15.9998Z"
        fill="#633CFF"
      />
    </svg>
  );
};

export default Navbar;

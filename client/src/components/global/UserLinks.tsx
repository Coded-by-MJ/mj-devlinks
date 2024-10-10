import { useLocation, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { LinkIcon, ProfileIcon } from "./Icons";

function UserLinks() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const activeClass = (pathname: string, href: string) => {
    return pathname === href && "bg-main-light rounded-md text-main";
  };

  const activeIcon = (pathname: string, href: string) => {
    return pathname === href && "fill-main";
  };

  return (
    <div className="flex gap-4 items-center">
      <Link
        to={"/user"}
        className={cn(
          "font-semibold px-6 py-3 justify-center group transition-all  hover:text-main  text-sm capitalize rounded-none text-main-gray  flex items-center gap-2 bg-transparent shadow-none",
          activeClass(pathname, "/user")
        )}
      >
        <LinkIcon
          className={cn(
            "group-hover:fill-main transition-all fill-main-gray",
            activeIcon(pathname, "/user")
          )}
        />
        <span className="hidden md:inline-block">Links</span>
      </Link>

      <Link
        to={"/user/profile"}
        className={cn(
          "font-semibold px-6 py-3 justify-center group transition-all  hover:text-main  text-sm capitalize rounded-none text-main-gray flex items-center gap-2 bg-transparent shadow-none",
          activeClass(pathname, "/user/profile")
        )}
      >
        <ProfileIcon
          className={cn(
            "group-hover:fill-main transition-all fill-main-gray",
            activeIcon(pathname, "/user/profile")
          )}
        />
        <span className="hidden md:inline-block">Profile Details</span>
      </Link>
    </div>
  );
}
export default UserLinks;

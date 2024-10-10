import { useAppSelector } from "@/hooks/redux-hooks";
import { cn } from "@/lib/utils";
import { getBgColor, getCorrespondingLogo } from "@/utils/helpers";
import { FaArrowRight } from "react-icons/fa6";

function DisplayProfile({
  className,
  isPreview,
}: {
  className?: string;
  isPreview: boolean;
}) {
  const user = useAppSelector((store) => store.user);

  return (
    <div className={`flex bg-white flex-col gap-[56px]  ${className}`}>
      {/* User Info */}
      <div className="flex flex-col gap-6 items-center">
        <div
          className={cn(
            "rounded-full w-full h-full size-[96px] bg-[#EEEEEE] )",
            user.image && "border-4 border-main"
          )}
        >
          {user.image && (
            <img
              src={user.image}
              alt={user.firstName}
              className="w-full rounded-full h-full object-cover"
            />
          )}
        </div>

        <div className=" flex flex-col gap-3 items-center">
          <span
            className={cn(
              "text-center text-base font-semibold text-main-dark inline-block",
              !user.firstName &&
                !user.lastName &&
                "bg-[#EEEEEE] w-40 rounded-[100px] h-2.5"
            )}
          >
            {user.firstName} {user.lastName}
          </span>
          <span
            className={cn(
              "text-center text-main-gray text-sm inline-block ",
              !user.email && "bg-[#EEEEEE] w-20 rounded-[106px] h-2.5"
            )}
          >
            {user.email}
          </span>
        </div>
      </div>

      {/* Social Links */}

      <article className="grid grid-cols-1 grid-rows-1 w-full">
        {!isPreview && (
          <div className="flex flex-col w-full  gap-5 row-span-full col-span-full z-0">
            {Array.from({ length: 5 }, (_, i) => {
              return (
                <div
                  className="h-[44px] py-[11px] rounded-[8px] w-full bg-[#EEEEEE]"
                  key={i}
                ></div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col w-full  gap-5 row-span-full col-span-full z-10">
          {user.socialLinks?.map((link) => {
            if (isPreview) {
              return (
                <a
                  href={link.url}
                  target="_blank"
                  key={link.id}
                  className={cn(
                    "h-[44px] py-[11px] z-10 px-4 flex items-center gap-2  rounded-[8px] w-full",
                    getBgColor(link.name)
                  )}
                >
                  {getCorrespondingLogo(link.name)}
                  <span className="flex-1 text-[12px]">{link.name}</span>
                  {link.name && <FaArrowRight className="size-[12px]" />}
                </a>
              );
            } else {
              return (
                <div
                  key={link.id}
                  className={cn(
                    "h-[44px] py-[11px] z-10 px-4 flex items-center gap-2  rounded-[8px] w-full",
                    getBgColor(link.name)
                  )}
                >
                  {getCorrespondingLogo(link.name)}
                  <span className="flex-1 text-[12px]">{link.name}</span>
                  {link.name && <FaArrowRight className="size-[12px]" />}
                </div>
              );
            }
          })}
        </div>
      </article>
    </div>
  );
}

export default DisplayProfile;

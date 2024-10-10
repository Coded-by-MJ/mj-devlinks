import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getUser } from "@/utils/actions";
import { getBgColor, getCorrespondingLogo } from "@/utils/helpers";
import { FaArrowRight } from "react-icons/fa6";
import { notFound, useLoaderData } from "@tanstack/react-router";
import { SocialLink } from "@/utils/types";

function SharePage() {
  const user = useLoaderData({ from: "/share/$id" });
  return (
    <section
      className={
        "mx-auto relative min-h-screen  max-w-[85rem] p-0 md:p-6 before:absolute before:w-full bg-white before:h-[360px] before:rounded-b-[32px] before:bg-main before:top-0 before:left-0"
      }
    >
      <div className="flex justify-center items-center w-full z-20 relative pt-24">
        <Card className=" w-[350px] p-[48px]">
          <div className={`flex bg-white flex-col gap-[56px]  w-full`}>
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
              <div className="flex flex-col w-full  gap-5 row-span-full col-span-full z-10">
                {user.socialLinks.map((link: SocialLink) => (
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
                ))}
              </div>
            </article>
          </div>
        </Card>
      </div>
    </section>
  );
}

export const loader = async ({ params }: { params: { id: string } }) => {
  const userId = params.id;
  const response = await getUser(userId);
  if ("message" in response) {
    throw notFound();
  }
  return response;
};

export default SharePage;

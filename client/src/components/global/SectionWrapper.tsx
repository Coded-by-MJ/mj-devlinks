import { cn } from "@/lib/utils";

function SectionWrapper({
  children,
  className,
  isPreview = false,
}: {
  children: React.ReactNode;
  className?: string;
  isPreview?: boolean;
}) {
  return (
    <section
      className={cn(
        "mx-auto relative  bg-[#EEEEEE]  min-h-screen  max-w-[90rem] p-0 md:p-6",
        className,
        isPreview &&
          "before:absolute before:w-full bg-white before:h-[360px] before:rounded-b-[32px] before:bg-main before:top-0 before:left-0"
      )}
    >
      {children}
    </section>
  );
}
export default SectionWrapper;

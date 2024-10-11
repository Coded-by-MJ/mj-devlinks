import { Skeleton } from "../ui/skeleton";
import PageWrapper from "./PageWrapper";

import SectionWrapper from "./SectionWrapper";

export function PageSkeleton() {
  return (
    <SectionWrapper>
      <Skeleton className="w-full h-[77px]" />
      <PageWrapper>
        <Skeleton className="hidden xl:block h-[800px] rounded-lg" />
        <Skeleton className="h-[800px]  rounded-lg" />
      </PageWrapper>
    </SectionWrapper>
  );
}

export function DisplaySkeleton() {
  return (
    <SectionWrapper>
      <div className="w-full flex justify-center items-center pt-10">
        <Skeleton className="w-[350px] h-[600px]  rounded-lg" />
      </div>
    </SectionWrapper>
  );
}

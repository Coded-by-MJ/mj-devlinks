import PageWrapper from "@/components/global/PageWrapper";
import Phone from "@/components/global/Phone";
import SaveButton from "@/components/global/SaveButton";
import SectionTitle from "@/components/global/SectionTitle";
import LinksContainer from "@/components/links/LinksContainer";

function LinksPage() {
  return (
    <PageWrapper>
      <article className="bg-white hidden rounded-sm  xl:flex justify-center p-6 pt-24">
        <Phone />
      </article>
      <article className="bg-white h-[846px] flex flex-col gap-10 rounded-md lg:pt-10 pt-6">
        <SectionTitle
          className="lg:px-10 px-6"
          heading="Customize your links"
          desc="Add/edit/remove links below and then share all your profiles with the world!"
        />
        <LinksContainer />
        <div className="border-t mt-auto w-full border-main-lgray md:p-6 p-4 flex md:justify-end justify-center items-center">
          <SaveButton functionName="saveUserSocialLinksFunction" />
        </div>
      </article>
    </PageWrapper>
  );
}

export default LinksPage;

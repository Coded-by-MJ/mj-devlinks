import PageWrapper from "@/components/global/PageWrapper";
import Phone from "@/components/global/Phone";
import SaveButton from "@/components/global/SaveButton";
import SectionTitle from "@/components/global/SectionTitle";
import UserForm from "@/components/profile/UserForm";

function ProfilePage() {
  return (
    <PageWrapper>
      <article className="bg-white hidden rounded-sm  xl:flex justify-center  p-6 pt-24">
        <Phone />
      </article>
      <article className="bg-white flex flex-col gap-10 rounded-md lg:pt-10 pt-6">
        <SectionTitle
          className="lg:px-10 px-6"
          heading="Profile Details"
          desc="Add your details to create a personal touch to your profile."
        />

        <UserForm />

        <div className="border-t w-full  border-main-lgray mt-auto md:p-6  p-4 flex md:justify-end justify-center items-center">
          <SaveButton functionName="saveUserInfoFunction" />
        </div>
      </article>
    </PageWrapper>
  );
}

export default ProfilePage;

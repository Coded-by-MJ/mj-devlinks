import emptyImage from "@/assets/emptyimage.png";

function EmptyLinks() {
  return (
    <div className="flex flex-col p-10 rounded-sm gap-10 items-center w-full bg-[#FAFAFA]">
      <img
        src={emptyImage}
        className="w-[250px] h-[160px] object-cover"
        alt="phone"
      />
      <div className="flex flex-col gap-6 items-center">
        <h2 className="text-main-dark font-bold text-[32px]">
          Let's get you started
        </h2>
        <p className="text-wrap text-sm text-main-gray text-center">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
}
export default EmptyLinks;

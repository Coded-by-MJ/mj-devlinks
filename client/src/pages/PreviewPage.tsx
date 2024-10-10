import { Card } from "@/components/ui/card";
import DisplayProfile from "@/components/global/DisplayProfile";
function PreviewPage() {
  return (
    <div className="flex justify-center items-center w-full pt-24">
      <Card className=" w-[350px] p-[48px] z-10">
        <DisplayProfile isPreview={true} className="w-full" />
      </Card>
    </div>
  );
}

export default PreviewPage;

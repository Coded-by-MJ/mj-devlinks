import { IoImageOutline } from "react-icons/io5";
import { validateImageFile } from "@/utils/helpers";
import { toast } from "@/hooks/use-toast";
import { uploadImage } from "@/utils/supabase";
import { renderError } from "@/utils/actions";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux-hooks";
import { updateUserInfo } from "@/features/user/userSlice";

function ImageInput() {
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const { image, firstName } = useAppSelector((store) => store.user);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] as File;

    try {
      await validateImageFile(file);
      const imagePath = await uploadImage(file);
      toast({
        description: "Upload Successful✅",
      });
      dispatch(updateUserInfo({ field: "image", value: imagePath }));
      setIsUploadSuccess(true);
    } catch (error) {
      const errMsg = renderError(error);
      toast({
        description: errMsg.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <span className="text-sm inline-block text-main-gray w-[40%] xl:w-[30%]">
        Profile Picture
      </span>

      <div className="flex flex-1 flex-col lg:flex-row items-start gap-6 lg:w-[60%] xl:w-[70%] w-full lg:items-center">
        <label
          htmlFor="image-upload"
          className="size-[196px] grid grid-cols-1 grid-rows-1 place-items-center  flex-shrink-0 bg-main-light rounded-md relative group"
        >
          {image && (
            <img
              src={image}
              alt={firstName}
              className="object-cover size-full rounded-md"
            />
          )}

          <div className="absolute top-0 left-1/2 -translate-x-1/2  size-full bg-transparent transition-all z-10 rounded-md flex gap-2 flex-col justify-center items-center group-hover:bg-black group-hover:bg-opacity-25">
            <IoImageOutline className="text-main size-10 transition-colors group-hover:text-white" />
            <span className="text-main text-sm font-semibold transition-colors group-hover:text-white">
              {isUploadSuccess ? "Change Image" : "+ Upload Image"}
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="image-upload"
            name="image"
            onChange={(e) => handleImageChange(e)}
          />
        </label>
        <span className="text-[12px]   inline-block text-main-gray">
          Image must be below 1024 x 1024px. Use PNG or JPG format.
        </span>
      </div>
    </>
  );
}
export default ImageInput;

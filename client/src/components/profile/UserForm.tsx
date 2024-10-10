import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userFormSchema } from "@/utils/schema";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageInput from "./ImageInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { updateUserInfo } from "@/features/user/userSlice";
import { UserInputField } from "@/utils/types";

function UserForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    mode: "all",
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as UserInputField;
    const value = event.target.value;

    dispatch(updateUserInfo({ field: fieldName, value }));
  };

  return (
    <Form {...form}>
      <form className="w-full lg:px-10 px-6   flex flex-col gap-6">
        {/* imageFeild   */}
        <div className="flex p-3 lg:justify-between  lg:items-center justify-start gap-4 lg:gap-0 flex-col lg:flex-row items-start">
          <ImageInput />
        </div>

        <div className="flex w-full flex-col  gap-3 p-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start lg:flex-row gap-[4px] lg:gap-0 space-y-0 lg:justify-between lg:items-center">
                <FormLabel className="text-sm text-main-gray w-[40%] xl:w-[30%]">
                  First name*
                </FormLabel>
                <FormControl>
                  <div
                    className={cn(
                      "xl:w-[70%] lg:w-[60%] w-full flex justify-between items-center border-main-gray border mt-0 focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                      form.formState.errors.firstName &&
                        "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                    )}
                  >
                    <input
                      placeholder="e.g. John"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e);
                      }}
                      onBlur={field.onBlur}
                      onInput={field.onChange}
                      className="flex-1 focus:outline-none focus:border-none text-base text-main-gray"
                    />
                    <FormMessage className="text-sm" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem
                className="flex flex-col items-start lg:flex-row gap-[4px] lg:gap-0 space-y-0 lg:justify-between lg:items-center
"
              >
                <FormLabel className="text-sm text-main-gray w-[40%] xl:w-[30%]">
                  Last name*
                </FormLabel>
                <FormControl>
                  <div
                    className={cn(
                      "xl:w-[70%] lg:w-[60%] w-full flex justify-between items-center border-main-gray border mt-0 focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                      form.formState.errors.lastName &&
                        "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                    )}
                  >
                    <input
                      placeholder="e.g. Appleseed"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e);
                      }}
                      onBlur={field.onBlur}
                      onInput={field.onChange}
                      className="flex-1 focus:outline-none focus:border-none text-base text-main-gray"
                    />
                    <FormMessage className="text-sm" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem
                className="flex flex-col items-start lg:flex-row gap-[4px] lg:gap-0 space-y-0 lg:justify-between lg:items-center
"
              >
                <FormLabel className="text-sm text-main-gray w-[40%] xl:w-[30%]">
                  Email
                </FormLabel>
                <FormControl>
                  <div
                    className={cn(
                      "xl:w-[70%] lg:w-[60%] w-full flex justify-between items-center border-main-gray border mt-0 focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                      form.formState.errors.email &&
                        "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                    )}
                  >
                    <input
                      placeholder="e.g. Appleseed"
                      {...field}
                      readOnly
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e);
                      }}
                      onBlur={field.onBlur}
                      onInput={field.onChange}
                      className="flex-1 focus:outline-none cursor-not-allowed focus:border-none text-base text-main-gray"
                    />
                    <FormMessage className="text-sm" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
export default UserForm;

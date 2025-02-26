import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EmailIcon, LockIcon } from "@/components/global/Icons";
import { cn } from "@/lib/utils";
import { LuEyeOff, LuEye } from "react-icons/lu";
import { useState } from "react";

function EmailInput({
  control,
  isError,
}: {
  control: any;
  isError: FieldError | undefined;
}) {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={cn(
              "text-[12px] text-main-gray",
              isError && "text-red-500"
            )}
          >
            Email Address
          </FormLabel>
          <FormControl>
            <div className="flex justify-start items-start gap-1 flex-col">
              <div
                className={cn(
                  "flex gap-3 items-center border-main-gray border w-full focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                  isError &&
                    "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                )}
              >
                <EmailIcon />

                <input
                  placeholder="e.g. alex@email.com"
                  {...field}
                  className="flex-1 focus:outline-none focus:border-none text-base text-main-gray"
                />
              </div>
              <FormMessage className="text-[12px]" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function PasswordInput({
  control,
  isError,
  format,
}: {
  control: any;
  isError: FieldError | undefined;
  format: "confirm" | "password";
}) {
  const [type, setType] = useState<"password" | "text">("password");

  return (
    <FormField
      control={control}
      name={format === "confirm" ? "confirmPassword" : "password"}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={cn(
              "text-[12px] text-main-gray",
              isError && "text-red-500"
            )}
          >
            {format === "confirm" ? "Confirm Password" : "Create Password"}
          </FormLabel>
          <FormControl>
            <div className="flex justify-start items-start gap-1 flex-col">
              <div
                className={cn(
                  "flex gap-3 items-center justify-between border-main-gray border w-full focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                  isError &&
                    "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                )}
              >
                <LockIcon />
                <input
                  placeholder="At least 8 characters"
                  {...field}
                  type={type}
                  className="flex-grow  focus:outline-none focus:border-none text-base text-main-gray"
                />
                <button
                  type="button"
                  className="size-[24px] items-center flex justify-center focus:outline-none"
                  onClick={() =>
                    setType(type === "password" ? "text" : "password")
                  }
                >
                  {type === "password" ? (
                    <LuEye className="text-main-gray size-4" />
                  ) : (
                    <LuEyeOff className="text-main-gray size-4" />
                  )}
                </button>
              </div>
              <FormMessage className="text-[12px]" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
export { EmailInput, PasswordInput };

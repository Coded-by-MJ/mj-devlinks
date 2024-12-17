import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { logInFormSchema } from "@/utils/schema";

import { EmailIcon, LockIcon } from "@/components/global/Icons";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LiaSpinnerSolid } from "react-icons/lia";
import { Link } from "@tanstack/react-router";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

function LoginFormContainer({
  onSubmit,
}: {
  onSubmit(values: z.infer<typeof logInFormSchema>): Promise<void>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleChangePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  "text-[12px] text-main-gray",
                  form.formState.errors.email && "text-red-500"
                )}
              >
                Email Address
              </FormLabel>
              <FormControl>
                <div
                  className={cn(
                    "flex gap-3 items-center border-main-gray border w-full focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                    form.formState.errors.email &&
                      "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                  )}
                >
                  <EmailIcon />

                  <input
                    placeholder="e.g. alex@email.com"
                    {...field}
                    className="flex-1 focus:outline-none focus:border-none text-base text-main-gray"
                  />
                  <FormMessage className="text-[12px]" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <>
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    "text-[12px] text-main-gray",
                    form.formState.errors.password && "text-red-500"
                  )}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <>
                    <div
                      className={cn(
                        "flex gap-3 items-center justify-between border-main-gray border w-full focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                        form.formState.errors.password &&
                          "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                      )}
                    >
                      <div className="flex gap-3 items-center flex-grow">
                        <LockIcon />

                        <input
                          placeholder="Enter your password"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="flex-1 focus:outline-none focus:border-none text-base text-main-gray"
                        />
                      </div>
                      <button
                        onClick={handleChangePassword}
                        className="grid cursor-pointer grid-cols-1 grid-rows-1 justify-center items-center px-1"
                      >
                        {showPassword ? (
                          <FaEyeSlash
                            className={
                              "col-span-full row-span-1 text-[#737373]"
                            }
                          />
                        ) : (
                          <EyeOpenIcon
                            className={
                              "col-span-full row-span-1 text-[#737373]"
                            }
                          />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-[12px]" />
                  </>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            asChild
            variant={"link"}
            className="text-main !my-0 w-[128px] ml-auto flex font-light px-0 text-[12px]"
          >
            <Link to="reset">Forgot your password?</Link>
          </Button>
        </>

        <Button
          type="submit"
          className="w-full h-[46px] bg-main hover:bg-main-shade disabled:bg-main-shade"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <LiaSpinnerSolid className="text-white size-6 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
export default LoginFormContainer;

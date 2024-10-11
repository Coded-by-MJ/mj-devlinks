import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerFormSchema } from "@/utils/schema";
import { LiaSpinnerSolid } from "react-icons/lia";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { EmailIcon, LockIcon } from "@/components/global/Icons";

function SignUpFormContainer({
  onSubmit,
}: {
  onSubmit(values: z.infer<typeof registerFormSchema>): Promise<void>;
}) {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  "text-[12px] text-main-gray",
                  form.formState.errors.password && "text-red-500"
                )}
              >
                Create Password
              </FormLabel>
              <FormControl>
                <div
                  className={cn(
                    "flex gap-3 items-center border-main-gray border w-full focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                    form.formState.errors.password &&
                      "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                  )}
                >
                  <LockIcon />

                  <input
                    placeholder="At least 8 characters"
                    {...field}
                    type="password"
                    className="flex-1 focus:outline-none focus:border-none text-base text-main-gray"
                  />
                  <FormMessage className="text-[12px]" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  "text-[12px] text-main-gray",
                  form.formState.errors.confirmPassword ||
                    form.formState.errors.password
                    ? "text-red-500"
                    : ""
                )}
              >
                Confirm Password
              </FormLabel>
              <FormControl>
                <div
                  className={cn(
                    "flex gap-3 items-center border-main-gray border w-full focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                    form.formState.errors.password &&
                      "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                  )}
                >
                  <LockIcon />

                  <input
                    placeholder="At least 8 characters"
                    {...field}
                    type="password"
                    className="flex-1 focus:outline-none focus:border-none text-base text-main-gray"
                  />
                  <FormMessage className="text-[12px]" />
                </div>
              </FormControl>
              <FormDescription>
                Password must contains at least 8 characters
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-[46px] bg-main hover:bg-main-shade disabled:bg-main-shade"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <LiaSpinnerSolid className="text-white size-6  animate-spin" />
          ) : (
            "Create new account"
          )}
        </Button>
      </form>
    </Form>
  );
}
export default SignUpFormContainer;

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

function LoginFormContainer({
  onSubmit,
}: {
  onSubmit(values: z.infer<typeof logInFormSchema>): Promise<void>;
}) {
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
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
                Password
              </FormLabel>
              <FormControl>
                <>
                  <div
                    className={cn(
                      "flex gap-3 items-center border-main-gray border w-full focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                      form.formState.errors.password &&
                        "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                    )}
                  >
                    <LockIcon />

                    <input
                      placeholder="Enter your password"
                      {...field}
                      type="password"
                      className="flex-1 focus:outline-none focus:border-none text-base text-main-gray"
                    />
                    <FormMessage className="text-[12px]" />
                  </div>
                  <Button
                    asChild
                    variant={"link"}
                    className="text-main justify-end !m-0 font-light px-0 text-[12px]"
                  >
                    <Link to="reset">Forgot your password?</Link>
                  </Button>
                </>
              </FormControl>
            </FormItem>
          )}
        />

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

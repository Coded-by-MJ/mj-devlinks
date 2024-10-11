import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { EmailIcon, LockIcon } from "@/components/global/Icons";
import { cn } from "@/lib/utils";
import { LiaSpinnerSolid } from "react-icons/lia";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { emailSchema, resetSchema } from "@/utils/schema";

export const EmailForm = ({
  onSubmit,
}: {
  onSubmit(values: z.infer<typeof emailSchema>): Promise<void>;
}) => {
  const createForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...createForm}>
      <form onSubmit={createForm.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={createForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  "text-[12px] text-main-gray",
                  createForm.formState.errors.email && "text-red-500"
                )}
              >
                Email Address
              </FormLabel>
              <FormControl>
                <div
                  className={cn(
                    "flex gap-3 items-center border-main-gray border w-full focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                    createForm.formState.errors.email &&
                      "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                  )}
                >
                  <EmailIcon />

                  <input
                    placeholder="e.g. alex@email.com"
                    {...field}
                    className="flex-1 focus:outline-none focus:border-none text-base text-main-gray"
                  />
                  <FormMessage className="text-sm" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-[46px] bg-main hover:bg-main-shade disabled:bg-main-shade"
          disabled={createForm.formState.isSubmitting}
        >
          {createForm.formState.isSubmitting ? (
            <LiaSpinnerSolid className="text-white size-6 animate-spin" />
          ) : (
            "Send reset code"
          )}
        </Button>
      </form>
    </Form>
  );
};

export const ResetPasswordForm = ({
  onSubmit,
}: {
  onSubmit(values: z.infer<typeof resetSchema>): Promise<void>;
}) => {
  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      pin: "",
    },
  });

  return (
    <Form {...resetForm}>
      <form onSubmit={resetForm.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={resetForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  "text-[12px] text-main-gray",
                  resetForm.formState.errors.password && "text-red-500"
                )}
              >
                New Password
              </FormLabel>
              <FormControl>
                <div
                  className={cn(
                    "flex gap-3 items-center border-main-gray border w-full focus-visible:shadow-main-light focus-visible:shadow-lg focus-visible:ring-main-shade h-[48px] p-3 rounded-[8px]",
                    resetForm.formState.errors.password &&
                      "border-red-500 focus-visible:shadow-red-200 focus-visible:shadow-md focus-visible:ring-red-200"
                  )}
                >
                  <LockIcon />

                  <input
                    placeholder="At least 8 characters"
                    {...field}
                    type="password"
                    onChange={field.onChange}
                    className="flex-1 focus:outline-none focus:border-none text-sm text-main-gray"
                  />
                  <FormMessage className="text-[12px]" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={resetForm.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex-col flex gap-2 items-start">
              <FormLabel
                className={cn(
                  "text-[12px] text-main-gray",
                  resetForm.formState.errors.pin && "text-red-500"
                )}
              >
                One-Time Password
              </FormLabel>
              <FormControl>
                <div className="self-center ">
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormDescription className="text-center">
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-[46px] bg-main hover:bg-main-shade disabled:bg-main-shade"
          disabled={resetForm.formState.isSubmitting}
        >
          {resetForm.formState.isSubmitting ? (
            <LiaSpinnerSolid className="text-white size-6 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

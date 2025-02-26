import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EmailInput, PasswordInput } from "../global/Inputs";
import { LiaSpinnerSolid } from "react-icons/lia";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "@/utils/schema";

export const ResetForm = ({
  onSubmit,
}: {
  onSubmit(values: z.infer<typeof registerFormSchema>): Promise<void>;
}) => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { errors, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <EmailInput control={form.control} isError={errors.email} />

        <PasswordInput
          control={form.control}
          isError={errors.password}
          format={"password"}
        />
        <PasswordInput
          control={form.control}
          isError={errors.confirmPassword}
          format={"confirm"}
        />

        <Button
          type="submit"
          className="w-full h-[46px] bg-main hover:bg-main-shade disabled:bg-main-shade"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LiaSpinnerSolid className="text-white size-6 animate-spin" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Form>
  );
};

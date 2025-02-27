import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerFormSchema } from "@/utils/schema";
import { LiaSpinnerSolid } from "react-icons/lia";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { EmailInput, PasswordInput } from "@/components/global/Inputs";

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
  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <EmailInput control={form.control} isError={errors.email} />
        <PasswordInput
          control={form.control}
          isError={errors.password}
          format="password"
        />
        <PasswordInput
          control={form.control}
          isError={errors.confirmPassword}
          format="confirm"
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

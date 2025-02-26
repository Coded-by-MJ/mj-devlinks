import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { logInFormSchema } from "@/utils/schema";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LiaSpinnerSolid } from "react-icons/lia";
import { Link } from "@tanstack/react-router";
import { EmailInput, PasswordInput } from "../global/Inputs";

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

  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <EmailInput control={form.control} isError={errors.email} />
        <>
          <PasswordInput
            control={form.control}
            isError={errors.password}
            format="password"
          />

          <Button
            asChild
            variant={"link"}
            type="button"
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

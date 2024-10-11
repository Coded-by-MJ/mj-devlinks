import SectionWrapper from "@/components/global/SectionWrapper";
import AuthForm from "@/components/auth/AuthForm";
import { AuthFormProps } from "@/utils/types";
import { toast } from "@/hooks/use-toast";
import { renderAuthError } from "@/utils/actions";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { emailSchema, resetSchema } from "@/utils/schema";
import { EmailForm, ResetPasswordForm } from "@/components/auth/ResetForms";

const authFormProps: AuthFormProps = {
  heading: "Reset your password",
  desc: "Enter your email address and we'll send you a code to reset your password.",
  type: "reset",
  link: "/",
  linkText: "Back to Login",
};

function Reset() {
  const [createSuccess, setCreateSuccess] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const handleCreate = async (values: z.infer<typeof emailSchema>) => {
    if (!isLoaded) return;
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: values.email,
      });

      setCreateSuccess(true);
    } catch (error) {
      const errMsg = renderAuthError(error);
      toast({
        description: errMsg.message,
        variant: "destructive",
      });
    }
  };
  const handleReset = async (values: z.infer<typeof resetSchema>) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: values.pin,
        password: values.password,
      });
      if (result.status === "complete") {
        setActive({ session: result.createdSessionId });

        navigate({
          to: `/user`,
        });
        toast({
          description: `Welcome Back 🤗`,
        });
      } else {
        console.error(JSON.stringify(result, null, 2));
      }
    } catch (error) {
      const errMsg = renderAuthError(error);
      toast({
        description: errMsg.message,
        variant: "destructive",
      });
    }
  };

  if (createSuccess) {
    return (
      <SectionWrapper className="flex justify-start md:justify-center pt-10 gap-[64px] md:gap-[51px] items-start flex-col md:items-center">
        <div className="bg-white mx-auto rounded-lg w-full max-w-[400px] md:rounded-xl p-6">
          <ResetPasswordForm onSubmit={handleReset} />
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="flex justify-start md:justify-center pt-10 gap-[64px] md:gap-[51px] items-start flex-col md:items-center">
      <AuthForm authFormProps={authFormProps}>
        <EmailForm onSubmit={handleCreate} />
      </AuthForm>
    </SectionWrapper>
  );
}
export default Reset;

import AuthForm from "@/components/auth/AuthForm";
import SectionWrapper from "@/components/global/SectionWrapper";
import { z } from "zod";
import { otpFormSchema, registerFormSchema } from "@/utils/schema";
import { useState } from "react";

import { useSignUp } from "@clerk/clerk-react";
import SignUpFormContainer from "@/components/auth/SignUpFormContainer";
import { renderAuthError } from "@/utils/actions";
import { toast } from "@/hooks/use-toast";
import VerifyOTPForm from "@/components/auth/VerifyOTPForm";
import { useCreateUser } from "@/hooks/react-query-hooks";
import { AuthFormProps } from "@/utils/types";

const authFormProps: AuthFormProps = {
  heading: "Create account",
  desc: "Let’s get you started sharing your links!",
  type: "register",
  link: "/",
  linkText: "Login",
  suggestion: "Already have an account?",
};

function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifyOTP, setVerifyOTP] = useState(false);
  const { createAuthUser } = useCreateUser();

  const handleSignUp = async (values: z.infer<typeof registerFormSchema>) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifyOTP(true);
    } catch (error) {
      const errMsg = renderAuthError(error);
      toast({
        description: errMsg.message,
        variant: "destructive",
      });
    }
  };

  const handleVerifyOTP = async (data: z.infer<typeof otpFormSchema>) => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: data.pin,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });

        const userId = signUpAttempt.createdUserId;
        if (!userId) {
          throw new Error("Account Creation Failed");
        }
        const userEmail = signUpAttempt.emailAddress!;
        await createAuthUser({ userId, email: userEmail });
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      const errMsg = renderAuthError(error);
      toast({
        description: errMsg.message,
        variant: "destructive",
      });
    }
  };

  if (verifyOTP) {
    return (
      <SectionWrapper className="flex justify-center gap-[51px] flex-col items-center">
        <VerifyOTPForm onSubmit={handleVerifyOTP} />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="flex justify-start md:justify-center pt-10 gap-[64px] md:gap-[51px] items-start flex-col md:items-center">
      <AuthForm authFormProps={authFormProps}>
        <SignUpFormContainer onSubmit={handleSignUp} />
      </AuthForm>
    </SectionWrapper>
  );
}

export default Register;

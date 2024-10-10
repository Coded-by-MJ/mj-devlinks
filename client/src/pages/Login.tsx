import AuthForm from "@/components/auth/AuthForm";
import SectionWrapper from "@/components/global/SectionWrapper";
import z from "zod";

import { logInFormSchema } from "@/utils/schema";
import LoginFormContainer from "@/components/auth/LoginFormContainer";
import { toast } from "@/hooks/use-toast";
import { renderAuthError } from "@/utils/actions";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";

const authFormProps = {
  heading: "Login",
  desc: "Add your details below to get back into the app",
  type: "login",
};

function Login() {
  const { isLoaded, setActive, signIn } = useSignIn();

  const navigate = useNavigate();

  const handleLogin = async (values: z.infer<typeof logInFormSchema>) => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        navigate({
          to: `/user`,
        });
        toast({
          description: `Welcome Back 🤗`,
        });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      const errMsg = renderAuthError(error);
      toast({
        description: errMsg.message,
        variant: "destructive",
      });
    }
  };

  return (
    <SectionWrapper className="flex justify-start md:justify-center pt-10 gap-[64px] md:gap-[51px] items-start flex-col md:items-center">
      <AuthForm authFormProps={authFormProps}>
        <LoginFormContainer onSubmit={handleLogin} />
      </AuthForm>
    </SectionWrapper>
  );
}

export default Login;

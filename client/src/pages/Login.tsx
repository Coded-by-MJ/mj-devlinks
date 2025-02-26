import AuthForm from "@/components/auth/AuthForm";
import SectionWrapper from "@/components/global/SectionWrapper";
import z from "zod";

import { logInFormSchema } from "@/utils/schema";
import LoginFormContainer from "@/components/auth/LoginFormContainer";
import { toast } from "@/hooks/use-toast";
import { loginUser, renderError } from "@/utils/actions";

import { useNavigate } from "@tanstack/react-router";
import { AuthFormProps } from "@/utils/types";
import { setUser } from "@/features/user/userSlice";
import { useAppDispatch } from "@/hooks/redux-hooks";

const authFormProps: AuthFormProps = {
  heading: "Login",
  desc: "Add your details below to get back into the app",
  type: "login",
  link: "/register",
  linkText: "Create account",
  suggestion: "Don’t have an account?",
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = async (values: z.infer<typeof logInFormSchema>) => {
    const { password } = values;
    try {
      const { id, firstName, lastName, email, image, socialLinks } =
        await loginUser({ email: values.email.toLowerCase(), password });
      dispatch(
        setUser({
          userId: id,
          firstName,
          lastName,
          email,
          image,
          socialLinks,
        })
      );

      navigate({
        to: `/user`,
      });
      toast({
        description: `Welcome Back 🤗`,
      });
    } catch (error) {
      const errMsg = renderError(error);
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

import AuthForm from "@/components/auth/AuthForm";
import SectionWrapper from "@/components/global/SectionWrapper";
import { z } from "zod";
import { registerFormSchema } from "@/utils/schema";

import SignUpFormContainer from "@/components/auth/SignUpFormContainer";
import { createUser, renderError } from "@/utils/actions";
import { toast } from "@/hooks/use-toast";
import { AuthFormProps } from "@/utils/types";
import { useNavigate } from "@tanstack/react-router";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setUser } from "@/features/user/userSlice";

const authFormProps: AuthFormProps = {
  heading: "Create account",
  desc: "Let’s get you started sharing your links!",
  type: "register",
  link: "/",
  linkText: "Login",
  suggestion: "Already have an account?",
};

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      const {
        id,
        firstName,
        lastName,
        email: userEmail,
        image,
        socialLinks,
      } = await createUser({
        email: values.email.toLowerCase(),
        password: values.password,
      });

      dispatch(
        setUser({
          userId: id,
          firstName,
          lastName,
          email: userEmail,
          image,
          socialLinks,
        })
      );
      navigate({ to: "/user" });
      toast({
        description: "Sign up Successful ✅",
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
        <SignUpFormContainer onSubmit={handleSignUp} />
      </AuthForm>
    </SectionWrapper>
  );
}

export default Register;

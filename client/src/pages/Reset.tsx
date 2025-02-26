import SectionWrapper from "@/components/global/SectionWrapper";
import AuthForm from "@/components/auth/AuthForm";
import { AuthFormProps } from "@/utils/types";
import { toast } from "@/hooks/use-toast";
import { renderError, resetUserPassword } from "@/utils/actions";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { ResetForm } from "@/components/auth/ResetForm";
import { registerFormSchema } from "@/utils/schema";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setUser } from "@/features/user/userSlice";

const authFormProps: AuthFormProps = {
  heading: "Reset your password",
  desc: "Enter your email address and we'll send you a code to reset your password.",
  type: "reset",
  link: "/",
  linkText: "Back to Login",
};

function Reset() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleReset = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      const {
        id,
        firstName,
        lastName,
        email: userEmail,
        image,
        socialLinks,
      } = await resetUserPassword({
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
        description: "Password Reset Successful ✅",
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
        <ResetForm onSubmit={handleReset} />
      </AuthForm>
    </SectionWrapper>
  );
}
export default Reset;

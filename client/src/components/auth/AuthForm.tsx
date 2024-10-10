import { Link } from "@tanstack/react-router";
import Logo from "../global/Logo";
import { AuthFormProps } from "@/utils/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

function AuthForm({
  authFormProps,
  children,
}: {
  authFormProps: AuthFormProps;
  children: React.ReactNode;
}) {
  return (
    <>
      <Logo className="h-10 pl-5 md:h-auto md:pl-0" />
      <Card className=" w-full md:w-[476px] border-none md:border rounded-none shadow-none md:rounded-xl">
        <CardHeader className="gap-[8px]">
          <CardTitle className="text-[32px] text-black font-bold">
            {authFormProps.heading}
          </CardTitle>
          <CardDescription className="text-base">
            {authFormProps.desc}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-center items-center">
          <p className="text-sm pr-1 text-main-gray font-light">
            {authFormProps.type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Button
            asChild
            variant={"link"}
            className="text-main font-light px-0 text-sm"
          >
            <Link to={authFormProps.type === "login" ? "/register" : "/"}>
              {authFormProps.type === "login" ? "Create account" : "Login"}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
export default AuthForm;

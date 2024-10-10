import { SignOutButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { toast } from "@/hooks/use-toast";
import { CiLogout } from "react-icons/ci";

function SignOutLink() {
  const handleLogout = () => {
    toast({
      description: "Logout Successful ✅",
    });
  };

  return (
    <SignOutButton>
      <Link
        to="/"
        title="log out"
        className="text-main-gray group transition-colors inline-flex items-center gap-2 hover:text-main"
        onClick={handleLogout}
      >
        <CiLogout className="text-main-gray group-hover:text-main transition-colors" />
        <span className="hidden md:inline-block">Logout</span>
      </Link>
    </SignOutButton>
  );
}
export default SignOutLink;

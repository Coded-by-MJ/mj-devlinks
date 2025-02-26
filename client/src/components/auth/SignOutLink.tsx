import { Link } from "@tanstack/react-router";
import { toast } from "@/hooks/use-toast";
import { CiLogout } from "react-icons/ci";
import Cookies from "js-cookie";

function SignOutLink() {
  const handleLogout = () => {
    Cookies.remove("userId");
    Cookies.remove("token");
    toast({
      description: "Logout Successful ✅",
    });
  };

  return (
    <Link
      to="/"
      title="log out"
      className="text-main-gray group transition-colors inline-flex items-center gap-2 hover:text-main"
      onClick={handleLogout}
    >
      <CiLogout className="text-main-gray group-hover:text-main transition-colors" />
      <span className="hidden md:inline-block">Logout</span>
    </Link>
  );
}
export default SignOutLink;

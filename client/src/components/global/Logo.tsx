import logo from "../../assets/devlinkLogo.svg";

function Logo({ className }: { className?: string }) {
  return <img src={logo} alt={"logo"} className={className} />;
}
export default Logo;

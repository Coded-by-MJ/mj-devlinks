import Navbar from "@/components/global/Navbar";
import SectionWrapper from "@/components/global/SectionWrapper";
import { Outlet, useLocation } from "@tanstack/react-router";
import { PreviewNavbar } from "@/components/global/Navbar";

function Layout() {
  const isPreview = useLocation({
    select: (location) => location.pathname === "/user/preview",
  });
  return (
    <SectionWrapper isPreview={isPreview}>
      {isPreview ? <PreviewNavbar /> : <Navbar />}
      <Outlet />
    </SectionWrapper>
  );
}

export default Layout;

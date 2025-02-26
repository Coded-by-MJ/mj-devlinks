import Navbar from "@/components/global/Navbar";
import SectionWrapper from "@/components/global/SectionWrapper";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { PreviewNavbar } from "@/components/global/Navbar";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/utils/actions";
import { setUser } from "@/features/user/userSlice";

function Layout() {
  const isPreview = useLocation({
    select: (location) => location.pathname === "/user/preview",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["User"],
    queryFn: () => getUser(),
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!isLoading && !isError && user && !("message" in user)) {
      const { id, firstName, lastName, email, socialLinks, image } = user;
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
    } else if (isError || !user) {
      navigate({ to: "/" });

      console.error("Unable to populate user state");
    }
  }, [user, isLoading, isError]);

  return (
    <SectionWrapper isPreview={isPreview}>
      {isPreview ? <PreviewNavbar /> : <Navbar />}
      <Outlet />
    </SectionWrapper>
  );
}

export default Layout;

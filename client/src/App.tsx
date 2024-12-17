import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  lazyRouteComponent,
} from "@tanstack/react-router";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useAuth, useClerk } from "@clerk/clerk-react";

import {
  Login,
  Register,
  PreviewPage,
  Layout,
  NotFoundPage,
  Reset,
} from "./pages";

import Error from "./components/global/Error";
import { getUser } from "./utils/actions";
import { authLoader, userLoader } from "./utils/loaders";
import { useEffect } from "react";
import { SignOut } from "@clerk/types";
import { setUser } from "./features/user/userSlice";
import { store } from "./store";
import { loader as shareLoader } from "./pages/SharePage";
import {
  DisplaySkeleton,
  PageSkeleton,
} from "./components/global/PendingSkeleton";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const populateUserState = async (userId: string, signOut: SignOut) => {
  const response = await queryClient.ensureQueryData({
    queryKey: ["User"],
    queryFn: () => getUser(userId),
    retry: 2,
  });

  if ("message" in response) {
    signOut();
    console.log(response.message);
  } else {
    store.dispatch(
      setUser({
        userId: response.clerk_id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        image: response.image,
        socialLinks: response.socialLinks,
      })
    );
  }
};

function App() {
  const rootRoute = createRootRoute({});
  const { isSignedIn, userId } = useAuth();
  const { signOut } = useClerk();

  useEffect(() => {
    if (isSignedIn && userId) {
      populateUserState(userId, signOut);
    }
  }, [isSignedIn, userId]);

  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Login,
    loader: authLoader(isSignedIn, userId),
  });

  const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/register",
    component: Register,
    loader: authLoader(isSignedIn, userId),
  });

  const resetRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/reset",
    component: Reset,
    loader: authLoader(isSignedIn, userId),
  });

  const userRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/user",
    component: Layout,
    loader: userLoader(isSignedIn, userId),
    pendingComponent: PageSkeleton,
  });

  const linksRoute = createRoute({
    getParentRoute: () => userRoute,
    path: "/",
    component: lazyRouteComponent(() => import("@/pages/LinksPage")),
  });

  const profileRoute = createRoute({
    getParentRoute: () => userRoute,
    path: "/profile",
    component: lazyRouteComponent(() => import("@/pages/ProfilePage")),
  });

  const previewRoute = createRoute({
    getParentRoute: () => userRoute,
    path: "/preview",
    component: PreviewPage,
    pendingComponent: DisplaySkeleton,
  });

  const shareRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/share/$id",
    component: lazyRouteComponent(() => import("@/pages/SharePage")),
    loader: shareLoader,
    pendingComponent: DisplaySkeleton,
  });

  const routeTree = rootRoute.addChildren([
    loginRoute,
    registerRoute,
    shareRoute,
    resetRoute,
    userRoute.addChildren([linksRoute, profileRoute, previewRoute]),
  ]);

  const router = createRouter({
    routeTree,
    defaultNotFoundComponent: NotFoundPage,
    defaultErrorComponent: Error,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

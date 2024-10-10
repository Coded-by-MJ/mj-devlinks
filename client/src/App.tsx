import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
} from "@tanstack/react-router";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useAuth, useClerk } from "@clerk/clerk-react";

import { Login, Register, PreviewPage, Layout, NotFoundPage } from "./pages";

import Error from "./components/global/Error";
import { getUser } from "./utils/actions";
import { authLoader, userLoader } from "./utils/loaders";
import { useEffect } from "react";
import { SignOut } from "@clerk/types";
import { setUser } from "./features/user/userSlice";
import { store } from "./store";
import { loader as shareLoader } from "./pages/SharePage";

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
    retry: 0,
  });

  if ("message" in response) {
    signOut();
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
    console.log(store.getState().user);
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

  const userRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/user",
    component: Layout,
    loader: userLoader(isSignedIn, userId),
  });

  const linksRoute = createRoute({
    getParentRoute: () => userRoute,
    path: "/",
    component: () => import("@/pages/LinksPage"),
  });

  const profileRoute = createRoute({
    getParentRoute: () => userRoute,
    path: "/profile",
    component: () => import("@/pages/ProfilePage"),
  });

  const previewRoute = createRoute({
    getParentRoute: () => userRoute,
    path: "/preview",
    component: PreviewPage,
  });

  const shareRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/$id",
    component: () => import("@/pages/SharePage"),
    loader: shareLoader,
  });

  const routeTree = rootRoute.addChildren([
    loginRoute,
    registerRoute,
    shareRoute,
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

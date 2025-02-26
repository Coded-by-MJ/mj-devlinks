import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  lazyRouteComponent,
} from "@tanstack/react-router";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import {
  Login,
  Register,
  PreviewPage,
  Layout,
  NotFoundPage,
  Reset,
} from "./pages";

import Error from "./components/global/Error";
import { authLoader, userLoader } from "./utils/loaders";
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

function App() {
  const rootRoute = createRootRoute({});

  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Login,
    loader: authLoader,
  });

  const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/sign-up",
    component: Register,
    loader: authLoader,
  });

  const resetRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/reset",
    component: Reset,
    loader: authLoader,
  });

  const userRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/user",
    component: Layout,
    pendingComponent: PageSkeleton,
    loader: userLoader,
  });

  const linksRoute = createRoute({
    getParentRoute: () => userRoute,
    path: "/",
    component: lazyRouteComponent(() => import("@/pages/LinksPage")),
  });

  const profileRoute = createRoute({
    getParentRoute: () => userRoute,
    path: "profile",
    component: lazyRouteComponent(() => import("@/pages/ProfilePage")),
  });

  const previewRoute = createRoute({
    getParentRoute: () => userRoute,
    path: "preview",
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

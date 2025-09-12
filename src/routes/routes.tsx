import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { lazy, Suspense } from "react";
import LoadingSpinner from "../component/ui/LoadingSpinner";
import { clientLoader } from "../lib/utils";
const AdminLayoutLazy = lazy(() => import("../layout/AdminLayout"));
const HomeLazy = lazy(() => import("../pages/home/Home"));
const AllUsersLazy = lazy(() => import("../pages/allUsers/AllUsers"));
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "dashboard",
    element: <AdminLayoutLazy />,
    loader: clientLoader,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomeLazy />
          </Suspense>
        ),
      },
      {
        path: "all-users",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AllUsersLazy />
          </Suspense>
        ),
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { lazy, Suspense } from "react";
import LoadingSpinner from "../component/ui/LoadingSpinner";
import { clientLoader } from "../lib/utils";
import { fetchUsers } from "../pages/allUsers/AllUsers";
import { loader } from "../pages/trips/CreateTrip";
import { loaderTripDetails } from "../pages/trips/TripDetails";
import { loaderAllTrips } from "../pages/trips/Trips";
const AdminLayoutLazy = lazy(() => import("../layout/AdminLayout"));
const HomeLazy = lazy(() => import("../pages/home/Home"));
const AllUsersLazy = lazy(() => import("../pages/allUsers/AllUsers"));
const TripsLazy = lazy(() => import("../pages/trips/Trips"));
const TripsFormLazy = lazy(() => import("../pages/trips/CreateTrip"));
const TripDetailsLazy = lazy(() => import("../pages/trips/TripDetails"));
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
        loader: clientLoader,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomeLazy />
          </Suspense>
        ),
      },

      {
        path: "trips",
        loader: loaderAllTrips,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TripsLazy />
          </Suspense>
        ),
      },
      {
        path: "trips/new",
        loader: loader,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TripsFormLazy />
          </Suspense>
        ),
      },
      {
        path: "trips/:id",
        loader: loaderTripDetails,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TripDetailsLazy />
          </Suspense>
        ),
      },
      {
        path: "all-users",
        loader: fetchUsers,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AllUsersLazy />
          </Suspense>
        ),
      },
    ],
  },
]);

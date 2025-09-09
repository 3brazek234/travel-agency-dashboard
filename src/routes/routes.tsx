import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AllUsers from "../pages/allUsers/AllUsers";
import Home from "../pages/home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "dashboard",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-users", element: <AllUsers /> },
    ],
  },
]);

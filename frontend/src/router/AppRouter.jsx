import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import { useDispatch } from "react-redux";
import HomeLayout from "../layout/HomeLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import { useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { setUser } from "../features/AuthSlice";

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let res = await axiosInstance.get("auth/user/current-user", {
        withCredentials: true,
      });
      dispatch(setUser(res.data.user));
    })();
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
        },
      ],
    },
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <HomeLayout />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;

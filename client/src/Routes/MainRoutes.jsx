import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout";
import Signup from "../Pages/Authentication/Signup";
import Login from "../Pages/Authentication/Login";
import MainLayout from "../Layouts/MainLayout";
import PrivateRoute from "../Utils/PrivateRoute";
import AllToDos from "../Pages/MainLayoutPages/AllToDos";
import ActiveTodos from "../Pages/MainLayoutPages/ActiveTodos";
import CompleteTodos from "../Pages/MainLayoutPages/CompleteTodos";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: "/",
        element: <AllToDos />,
      },

      {
        path: "/active",
        element: <ActiveTodos />,
      },

      {
        path: "/complete",
        element: <CompleteTodos />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
]);

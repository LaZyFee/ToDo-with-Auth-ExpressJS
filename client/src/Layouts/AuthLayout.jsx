import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";

function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default AuthLayout;

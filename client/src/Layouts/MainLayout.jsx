import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import { useAuth } from "../Store/AuthStore";
import { HiMenuAlt2 } from "react-icons/hi";
import { CiPower } from "react-icons/ci";

function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Flex container to position the icon at the top without extra spacing */}
          <div className="flex justify-between items-center p-4 lg:hidden">
            <label htmlFor="my-drawer-2" className="drawer-button">
              <HiMenuAlt2 className="text-3xl" />
            </label>
          </div>

          {/* Page content here */}
          <Outlet />
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex flex-col justify-around h-full p-4 bg-slate-900 text-white">
            <div className="flex flex-col gap-3 items-center">
              <p className="text-xl font-bold text-red-400">{user?.name}</p>
              <p className="text-center text-violet-400">{user?.email}</p>
            </div>

            <ul className="menu">
              <li>
                <button className="text-2xl m-3" onClick={handleLogout}>
                  <CiPower />
                  <p className="text-sm">Logout</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;

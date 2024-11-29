import { NavLink } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";
import { RiAuctionLine } from "react-icons/ri";
import { GrCompliance } from "react-icons/gr";

function Tab() {
  const menuItems = [
    { name: "My ToDos", icon: <LuListTodo />, path: "/" },
    { name: "Active ToDos", icon: <RiAuctionLine />, path: "/active" },
    { name: "Completed ToDos", icon: <GrCompliance />, path: "/complete" },
  ];

  return (
    <div
      role="tablist"
      className="tabs tabs-bordered w-full text-center mx-auto flex justify-center lg:gap-2 p-2"
    >
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `tab ${isActive ? "tab-active font-semibold text-rose-700" : ""} 
             textarea-xs sm:text-base lg:text-lg whitespace-nowrap`
          }
          role="tab"
        >
          <span className="inline-flex items-center">
            {item.icon}
            <span className="ml-2">{item.name}</span>
          </span>
        </NavLink>
      ))}
    </div>
  );
}

export default Tab;

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function Navbar() {
  // State to track theme
  const [theme, setTheme] = useState("winter");

  // Effect to apply the theme to the `html` element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "winter" ? "night" : "winter");
  };

  return (
    <div className="navbar shadow-xl">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">ToDo</a>
      </div>
      <div className="navbar-end flex items-center">
        {/* Using icons as the toggle button */}
        <button onClick={toggleTheme} className="p-2 rounded-full">
          {theme === "winter" ? (
            <FaSun className="text-yellow-500 w-6 h-6" />
          ) : (
            <FaMoon className="text-blue-500 w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;

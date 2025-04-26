import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
      <div className="flex gap-4">
        <Link to="/projects" className="font-bold">
          Projects
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button onClick={logout} className="text-red-500">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

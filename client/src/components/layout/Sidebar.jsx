import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className={location.pathname === "/projects" ? "active" : ""}>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

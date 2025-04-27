import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/projects")}>
        Task Manager
      </div>
      {currentUser && (
        <div className="user-menu">
          <span className="user-name">Hello, {currentUser.name}</span>
          <button onClick={logout} className="btn btn-small">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

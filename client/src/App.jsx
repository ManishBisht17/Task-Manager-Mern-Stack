import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProjectList from "./components/projects/ProjectList";
import TaskList from "./components/tasks/TaskList";

// PrivateRoute component for protected routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// PublicRoute component for routes accessible only when not authenticated
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/projects" /> : children;
};

// Main App component
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

// AppContent component to use the auth context
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ProjectList />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId/tasks"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/projects" />} />
          <Route path="*" element={<Navigate to="/projects" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

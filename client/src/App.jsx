import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/projects"
            element={token ? <Projects /> : <Navigate to="/login" />}
          />
          <Route
            path="/tasks/:projectId"
            element={token ? <Tasks /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

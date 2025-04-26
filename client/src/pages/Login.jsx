import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", data.token);
      navigate("/projects");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn">Login</button>
      </form>
    </div>
  );
}

export default Login;

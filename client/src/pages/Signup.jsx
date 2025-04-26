import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      localStorage.setItem("token", data.token);
      navigate("/projects");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Signup</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          className="input"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <input
          className="input"
          placeholder="Country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          required
        />
        <button className="btn">Signup</button>
      </form>
    </div>
  );
}

export default Signup;

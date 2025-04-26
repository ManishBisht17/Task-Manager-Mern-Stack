import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../api";

export default function AuthForm({ isLogin, setUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;
      const { data } = isLogin ? await login(payload) : await signup(payload);

      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Auth error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow"
    >
      {!isLogin && (
        <>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="input"
            required
          />
        </>
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="input"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="input"
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isLogin ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
}

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as authService from "../services/auth.service";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const sortedCountries = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(sortedCountries);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
        setCountries([]);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountrySearch = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const selectCountry = (country) => {
    setFormData({
      ...formData,
      country: country,
    });
    setSearchTerm(country);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const userData = await authService.register(
        formData.name,
        formData.email,
        formData.password,
        formData.country
      );
      login(userData);
      navigate("/projects");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <div className="country-search-container">
              <input
                type="text"
                id="country"
                name="country"
                value={searchTerm}
                onChange={handleCountrySearch}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search for your country"
                required
              />
              {showDropdown && (
                <div className="country-dropdown">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.slice(0, 10).map((country) => (
                      <div
                        key={country}
                        className="country-option"
                        onClick={() => selectCountry(country)}
                      >
                        {country}
                      </div>
                    ))
                  ) : (
                    <div className="no-results">No countries found</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

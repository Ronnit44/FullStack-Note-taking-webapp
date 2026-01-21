import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./loadingindicator";
import "../styles/Form.css";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const isRegister = method === "register";
  const name = isRegister ? "Register" : "Login";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Validate passwords match for registration
    if (isRegister && password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const payload = isRegister
        ? { username, password, first_name: firstName, last_name: lastName }
        : { username, password };

      const res = await api.post(route, payload);
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        toast.success("Welcome back!");
        navigate("/");
      } else {
        toast.success("Account created! Please login.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid credentials");
      } else if (error.response?.status === 400) {
        toast.error("Username already exists");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>

      {isRegister && (
        <>
          <input
            className="form-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />

          <input
            className="form-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name (optional)"
          />
        </>
      )}

      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      {/* Password */}
      <div className="password-container">
        <input
          className="form-input"
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button
          type="button"
          className="password-eye-button"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? "🙈" : "👁️"}
        </button>
      </div>

      {/* Confirm Password */}
      {isRegister && (
        <div className="password-container">
          <input
            className="form-input"
            type={confirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />

          <button
            type="button"
            className="password-eye-button"
            onClick={() =>
              setConfirmPasswordVisible(!confirmPasswordVisible)
            }
          >
            {confirmPasswordVisible ? "🙈" : "👁️"}
          </button>
        </div>
      )}

      {loading && <LoadingIndicator />}

      <button className="form-button" type="submit" disabled={loading}>
        {loading ? "Please wait..." : name}
      </button>
    </form>
  );
}

export default Form;

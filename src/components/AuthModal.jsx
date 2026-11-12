import { useState } from "react";
import "../styles/AuthModal.css";

// Login / Signup popup. Users are saved in localStorage (there is no backend).
function AuthModal({ mode, onChangeMode, onClose, onLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const isLogin = mode === "login";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage("");
  };

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("users")) || [];
    } catch (error) {
      return [];
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isLogin && form.username.trim() === "") {
      newErrors.username = "Username is required";
    }
    if (form.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (form.password === "") {
      newErrors.password = "Password is required";
    } else if (!isLogin && form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!isLogin && form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const users = getUsers();

    if (isLogin) {
      const found = users.find(
        (u) => u.email === form.email && u.password === form.password
      );
      if (!found) {
        setMessage("Wrong email or password");
        return;
      }
      onLogin({ username: found.username, email: found.email });
    } else {
      if (users.find((u) => u.email === form.email)) {
        setErrors({ email: "This email is already registered" });
        return;
      }
      const newUser = {
        username: form.username,
        email: form.email,
        password: form.password,
      };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      onLogin({ username: newUser.username, email: newUser.email });
    }
  };

  const switchMode = () => {
    setErrors({});
    setMessage("");
    onChangeMode(isLogin ? "signup" : "login");
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-box" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2>{isLogin ? "Login" : "Signup"}</h2>
        <p className="auth-switch">
          {isLogin ? "New to Tech-Shop ? " : "Already have an account ? "}
          <button type="button" onClick={switchMode}>
            {isLogin ? "Create an account" : "Login"}
          </button>
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <div className="auth-field">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
              />
              {errors.username && <span className="auth-error">{errors.username}</span>}
            </div>
          )}

          <div className="auth-field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="auth-error">{errors.email}</span>}
          </div>

          <div className="auth-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span className="auth-error">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="auth-field">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="auth-error">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          {message && <p className="auth-message">{message}</p>}

          <button type="submit" className="btn-red auth-submit">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <div className="auth-or">
          <span>or login with</span>
        </div>

        <div className="auth-social">
          <button
            className="facebook"
            onClick={() => setMessage("Facebook login is not available in this demo")}
          >
            Facebook
          </button>
          <button
            className="google"
            onClick={() => setMessage("Google login is not available in this demo")}
          >
            Google
          </button>
          <button
            className="twitter"
            onClick={() => setMessage("Twitter login is not available in this demo")}
          >
            Twitter
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;

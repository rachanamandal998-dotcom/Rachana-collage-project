import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom"; // 👈 Import Link from react-router-dom
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setSuccess("");

    // Mock credentials (replace with backend API later)
    const mockUser = {
      phone: "9876543210",
      password: "123456",
    };

    if (phone === mockUser.phone && password === mockUser.password) {
      setSuccess("Login successful! 🎉");
      toast.success("Welcome back!");
    } else {
      toast.error("Invalid phone number or password!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Open Skill Zone</h2>
          <h3>Welcome Back</h3>

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {success && <p className="success">{success}</p>}

          <button type="submit">Login</button>

          {/* 👇 Add this section */}
          <p className="signup-link">
            Don’t have an account?{" "}
            <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
};

export default Login;

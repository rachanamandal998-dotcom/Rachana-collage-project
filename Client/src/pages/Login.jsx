import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccess("");

    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          password: password,
        }),
      });

      const resData = await response.json();

      if (response.ok) {
        localStorage.setItem("token", resData.token); // ✅ save token
        toast.success("Login Successful!");

        setTimeout(() => {
          navigate("/course"); // redirect after login
        }, 1200);
      } else {
        toast.error(resData.message || "Invalid phone or password");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
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

          <p className="signup-link">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
};

export default Login;

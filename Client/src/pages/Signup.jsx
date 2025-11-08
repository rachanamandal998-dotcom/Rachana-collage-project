import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ✅ API CALL
    try {
      const response = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          phone: phone, 
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Signup successful! 🎉");
        console.log("User Registered:", data);

        // Optional: clear form
        setFullName("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="signup-containerWrapper">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Open Skill Zone</h2>
          <h3>Create Your Account</h3>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

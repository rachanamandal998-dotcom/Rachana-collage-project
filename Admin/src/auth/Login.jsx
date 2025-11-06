import React, { useState } from "react";
import { Mail, Lock, Fingerprint } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault(); // stop page reload
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:4000/admin/login", {
        email,
        password,
      });
      if(res.status === 200){
          navigate('/dashboard')
              localStorage.setItem("token", res.data.token);
      }
      else{
        setError(err.response?.data?.message || "Login failed ❌");
      }
     
    } catch (err) {
      setError(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Fingerprint className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-8 transition-all duration-500 hover:shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2">Please sign in to continue</p>
          </div>

          {/* Removed onSubmit, using onClick instead */}
          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

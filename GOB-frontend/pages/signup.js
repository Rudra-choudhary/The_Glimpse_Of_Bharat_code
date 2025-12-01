// pages/signup.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://the-glimpse-of-bharat.onrender.com/api/auth/signup", formData);
      setError("");
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1200);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      setMessage("");
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      {/* Same blobs as login */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="auth-container">
        <div className="auth-box">
          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>

          {message && <div className="message success">{message}</div>}
          {error && <div className="message error">{error}</div>}
        </div>
      </div>
    </>
  );
}

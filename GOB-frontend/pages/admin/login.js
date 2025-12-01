import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminLogin() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/api/auth/login", formData);

            if (res.data.user.role !== "admin") {
                setError("Access denied. Admin privileges required.");
                return;
            }

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userName", res.data.user.name);
            localStorage.setItem("userRole", res.data.user.role);

            router.push("/admin");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <>
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="auth-container">
                <div className="auth-box" style={{ borderTop: "4px solid var(--primary)" }}>
                    <h2 style={{ marginBottom: "0.5rem" }}>Admin Portal</h2>
                    <p style={{ marginBottom: "2rem", color: "#666" }}>Restricted Access</p>

                    <form onSubmit={handleSubmit}>
                        <input
                            name="email"
                            type="email"
                            placeholder="Admin Email"
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
                        <button type="submit">Login to Dashboard</button>
                    </form>

                    {error && <div className="message error">{error}</div>}
                </div>
            </div>
        </>
    );
}

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Contribute() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("story"); // story | new_profile
    const [fighters, setFighters] = useState([]);
    const [formData, setFormData] = useState({
        contributorName: "",
        contributorEmail: "",
        content: "",
        freedomFighterId: "",
        imageUrl: "",
        fighterName: "",
        sources: [""],
        timeline: [{ year: "", title: "", description: "" }],
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchFighters();
    }, []);

    const fetchFighters = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/fighters?limit=100");
            setFighters(res.data.fighters);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Sources Handlers
    const handleSourceChange = (index, value) => {
        const newSources = [...formData.sources];
        newSources[index] = value;
        setFormData({ ...formData, sources: newSources });
    };
    const addSource = () => {
        setFormData({ ...formData, sources: [...formData.sources, ""] });
    };
    const removeSource = (index) => {
        const newSources = formData.sources.filter((_, i) => i !== index);
        setFormData({ ...formData, sources: newSources });
    };

    // Timeline Handlers
    const handleTimelineChange = (index, field, value) => {
        const newTimeline = [...formData.timeline];
        newTimeline[index][field] = value;
        setFormData({ ...formData, timeline: newTimeline });
    };
    const addTimelineEvent = () => {
        setFormData({ ...formData, timeline: [...formData.timeline, { year: "", title: "", description: "" }] });
    };
    const removeTimelineEvent = (index) => {
        const newTimeline = formData.timeline.filter((_, i) => i !== index);
        setFormData({ ...formData, timeline: newTimeline });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/contributions", {
                ...formData,
                type: activeTab,
            });
            setMessage("Contribution submitted successfully! It is under review.");
            setError("");
            setFormData({
                contributorName: "",
                contributorEmail: "",
                content: "",
                freedomFighterId: "",
                imageUrl: "",
                fighterName: "",
                sources: [""],
                timeline: [{ year: "", title: "", description: "" }],
            });
        } catch (err) {
            setError("Failed to submit contribution. Please try again.");
            setMessage("");
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="brand" onClick={() => router.push("/")} style={{ cursor: 'pointer' }}>The Glimpse of Bharat</div>
                <ul className="nav-links">
                    <li onClick={() => router.push("/")}>Home</li>
                    <li onClick={() => router.push("/fighters")}>Browse Fighters</li>
                    <li className="active">Contribute</li>
                </ul>
                <button className="btn-primary" onClick={() => router.push("/login")}>Login</button>
            </nav>

            <div className="blob blob-1" />
            <div className="blob blob-2" />

            <div className="container" style={{ paddingTop: "100px", maxWidth: "800px", margin: "0 auto" }}>
                <div className="card">
                    <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "var(--primary)" }}>Contribute to the Archives</h1>
                    <p style={{ textAlign: "center", marginBottom: "2rem", color: "var(--text-light)" }}>
                        Help us preserve the stories of India's heroes. Submit a new profile or add a story to an existing one.
                    </p>

                    <div className="tabs" style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", gap: "1rem" }}>
                        <button
                            className={`btn ${activeTab === "story" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => setActiveTab("story")}
                        >
                            Add Story to Existing Profile
                        </button>
                        <button
                            className={`btn ${activeTab === "new_profile" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => setActiveTab("new_profile")}
                        >
                            Propose New Fighter Profile
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                        {/* Common Fields */}
                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                name="contributorName"
                                value={formData.contributorName}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Your Email (Optional)</label>
                            <input
                                name="contributorEmail"
                                type="email"
                                value={formData.contributorEmail}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                            />
                        </div>

                        {/* Conditional Fields */}
                        {activeTab === "story" ? (
                            <div className="form-group">
                                <label>Select Freedom Fighter</label>
                                <select
                                    name="freedomFighterId"
                                    value={formData.freedomFighterId}
                                    onChange={handleChange}
                                    required
                                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                                >
                                    <option value="">-- Select a Fighter --</option>
                                    {fighters.map((f) => (
                                        <option key={f.id} value={f.id}>{f.name}</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label>Freedom Fighter Name</label>
                                    <input
                                        name="fighterName"
                                        value={formData.fighterName}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Subhas Chandra Bose"
                                        style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Image URL</label>
                                    <input
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        placeholder="https://example.com/image.jpg"
                                        style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                                    />
                                </div>

                                {/* Timeline Section */}
                                <div className="form-group">
                                    <label>Timeline Events</label>
                                    {formData.timeline.map((event, index) => (
                                        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "start" }}>
                                            <div style={{ flex: 1 }}>
                                                <input
                                                    placeholder="Year"
                                                    value={event.year}
                                                    onChange={(e) => handleTimelineChange(index, "year", e.target.value)}
                                                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", marginBottom: "5px" }}
                                                />
                                                <input
                                                    placeholder="Title"
                                                    value={event.title}
                                                    onChange={(e) => handleTimelineChange(index, "title", e.target.value)}
                                                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", marginBottom: "5px" }}
                                                />
                                                <textarea
                                                    placeholder="Description"
                                                    value={event.description}
                                                    onChange={(e) => handleTimelineChange(index, "description", e.target.value)}
                                                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
                                                    rows="2"
                                                />
                                            </div>
                                            {formData.timeline.length > 1 && (
                                                <button type="button" onClick={() => removeTimelineEvent(index)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>✕</button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" onClick={addTimelineEvent} className="btn-outline small" style={{ marginTop: "5px" }}>+ Add Event</button>
                                </div>
                            </>
                        )}

                        <div className="form-group">
                            <label>{activeTab === "story" ? "Story / Contribution" : "Biography / Description"}</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows="6"
                                placeholder="Share the details..."
                                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", resize: "vertical" }}
                            />
                        </div>

                        {/* Sources Section (Available for both tabs) */}
                        <div className="form-group">
                            <label>Sources / References</label>
                            {formData.sources.map((source, index) => (
                                <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                    <input
                                        value={source}
                                        onChange={(e) => handleSourceChange(index, e.target.value)}
                                        placeholder="e.g. Wikipedia, Book Title"
                                        style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
                                    />
                                    {formData.sources.length > 1 && (
                                        <button type="button" onClick={() => removeSource(index)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>✕</button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={addSource} className="btn-outline small">+ Add Source</button>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "14px", fontSize: "1.1rem" }}>
                            Submit Contribution
                        </button>
                    </form>

                    {message && <div className="message success" style={{ marginTop: "1rem" }}>{message}</div>}
                    {error && <div className="message error" style={{ marginTop: "1rem" }}>{error}</div>}
                </div>
            </div>

            <footer className="footer">
                <p>The Glimpse of Bharat — An open-source chronicle of freedom.</p>
            </footer>
        </div>
    );
}

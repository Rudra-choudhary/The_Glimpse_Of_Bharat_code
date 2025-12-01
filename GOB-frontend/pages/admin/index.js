import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("contributions"); // contributions | create | fighters
    const [contributions, setContributions] = useState([]);
    const [fighters, setFighters] = useState([]);
    const [loading, setLoading] = useState(true);

    // Create Fighter Form State
    const [fighterData, setFighterData] = useState({
        name: "",
        role: "",
        description: "",
        born: "",
        died: "",
        location: "",
        imageUrl: "",
    });

    // Edit Fighter State
    const [editingFighter, setEditingFighter] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");

        if (!token || role !== "admin") {
            router.push("/admin/login");
            return;
        }

        fetchContributions();
        fetchFighters();
    }, []);

    const fetchContributions = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("https://the-glimpse-of-bharat.onrender.com/api/contributions?status=pending", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContributions(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const fetchFighters = async () => {
        try {
            const res = await axios.get("https://the-glimpse-of-bharat.onrender.com/api/fighters?limit=100");
            setFighters(res.data.fighters);
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`https://the-glimpse-of-bharat.onrender.com/api/contributions/${id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchContributions(); // Refresh list
            if (status === 'approved') fetchFighters(); // Refresh fighters if approved
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const handleDeleteFighter = async (id) => {
        if (!confirm("Are you sure you want to delete this fighter? This action cannot be undone.")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://the-glimpse-of-bharat.onrender.com/api/fighters/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Fighter deleted successfully");
            fetchFighters();
        } catch (err) {
            alert("Failed to delete fighter");
        }
    };

    const handleEditFighter = (fighter) => {
        setEditingFighter({ ...fighter });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        setEditingFighter({ ...editingFighter, [e.target.name]: e.target.value });
    };

    const handleUpdateFighter = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`https://the-glimpse-of-bharat.onrender.com/api/fighters/${editingFighter.id}`, editingFighter, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Fighter updated successfully!");
            setShowEditModal(false);
            setEditingFighter(null);
            fetchFighters();
        } catch (err) {
            alert("Failed to update fighter");
        }
    };

    const handleFighterChange = (e) => {
        setFighterData({ ...fighterData, [e.target.name]: e.target.value });
    };

    const handleFighterSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("https://the-glimpse-of-bharat.onrender.com/api/fighters", fighterData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Fighter created successfully!");
            setFighterData({
                name: "", role: "", description: "", born: "", died: "", location: "", imageUrl: ""
            });
            fetchFighters();
        } catch (err) {
            alert("Failed to create fighter");
        }
    };

    if (loading) return <div className="container" style={{ paddingTop: "100px", textAlign: "center" }}>Loading...</div>;

    return (
        <>
            <div className="container" style={{ paddingTop: "100px", maxWidth: "1200px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <h1>Admin Dashboard</h1>
                    <button
                        className="btn btn-outline"
                        onClick={() => {
                            localStorage.clear();
                            router.push("/admin/login");
                        }}
                    >
                        Logout
                    </button>
                </div>

                <div className="tabs" style={{ marginBottom: "2rem", borderBottom: "1px solid #ddd" }}>
                    <button
                        style={{
                            padding: "1rem 2rem",
                            background: "none",
                            border: "none",
                            borderBottom: activeTab === "contributions" ? "3px solid var(--primary)" : "none",
                            fontWeight: "bold",
                            cursor: "pointer",
                            color: activeTab === "contributions" ? "var(--primary)" : "#666"
                        }}
                        onClick={() => setActiveTab("contributions")}
                    >
                        Pending Contributions
                    </button>
                    <button
                        style={{
                            padding: "1rem 2rem",
                            background: "none",
                            border: "none",
                            borderBottom: activeTab === "create" ? "3px solid var(--primary)" : "none",
                            fontWeight: "bold",
                            cursor: "pointer",
                            color: activeTab === "create" ? "var(--primary)" : "#666"
                        }}
                        onClick={() => setActiveTab("create")}
                    >
                        Create Fighter Profile
                    </button>
                    <button
                        style={{
                            padding: "1rem 2rem",
                            background: "none",
                            border: "none",
                            borderBottom: activeTab === "fighters" ? "3px solid var(--primary)" : "none",
                            fontWeight: "bold",
                            cursor: "pointer",
                            color: activeTab === "fighters" ? "var(--primary)" : "#666"
                        }}
                        onClick={() => setActiveTab("fighters")}
                    >
                        Manage Fighters
                    </button>
                </div>

                {activeTab === "contributions" && (
                    <div className="contributions-list">
                        {contributions.length === 0 ? (
                            <p>No pending contributions.</p>
                        ) : (
                            contributions.map((c) => (
                                <div key={c._id} className="card" style={{ marginBottom: "1.5rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                        <div>
                                            <span className="badge" style={{ background: "#eee", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem" }}>
                                                {c.type === "new_profile" ? "New Profile Proposal" : "Story Contribution"}
                                            </span>
                                            <h3 style={{ marginTop: "0.5rem" }}>
                                                {c.type === "new_profile" ? c.fighterName : `For: ${c.freedomFighterId?.name}`}
                                            </h3>
                                            <p style={{ fontSize: "0.9rem", color: "#666" }}>
                                                By: {c.contributorName} ({c.contributorEmail || "No email"})
                                            </p>
                                        </div>
                                        <div style={{ textAlign: "right", fontSize: "0.9rem", color: "#888" }}>
                                            {new Date(c.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div style={{ background: "#f9f9f9", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                                        <p style={{ whiteSpace: "pre-wrap" }}>{c.content}</p>
                                        {c.imageUrl && (
                                            <div style={{ marginTop: "1rem" }}>
                                                <strong>Image: </strong>
                                                <a href={c.imageUrl} target="_blank" rel="noreferrer">{c.imageUrl}</a>
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleStatusUpdate(c._id, "approved")}
                                            style={{ background: "#2ecc71", borderColor: "#2ecc71" }}
                                        >
                                            Approve & Publish
                                        </button>
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => handleStatusUpdate(c._id, "rejected")}
                                            style={{ color: "#e74c3c", borderColor: "#e74c3c" }}
                                        >
                                            Reject
                                        </button>
                                        {c.type === "new_profile" && (
                                            <button
                                                className="btn btn-outline"
                                                onClick={() => window.open(`/admin/preview/${c._id}`, '_blank')}
                                            >
                                                Preview Page
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "create" && (
                    <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <h2>Create New Freedom Fighter</h2>
                        <form onSubmit={handleFighterSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
                            <input name="name" placeholder="Full Name" value={fighterData.name} onChange={handleFighterChange} required style={{ padding: "10px" }} />
                            <input name="role" placeholder="Role / Title" value={fighterData.role} onChange={handleFighterChange} required style={{ padding: "10px" }} />
                            <input name="born" placeholder="Born (e.g. 2 October 1869)" value={fighterData.born} onChange={handleFighterChange} style={{ padding: "10px" }} />
                            <input name="died" placeholder="Died (e.g. 30 January 1948)" value={fighterData.died} onChange={handleFighterChange} style={{ padding: "10px" }} />
                            <input name="location" placeholder="Location" value={fighterData.location} onChange={handleFighterChange} style={{ padding: "10px" }} />
                            <input name="imageUrl" placeholder="Image URL" value={fighterData.imageUrl} onChange={handleFighterChange} style={{ padding: "10px" }} />
                            <textarea name="description" placeholder="Biography / Description" value={fighterData.description} onChange={handleFighterChange} required rows="6" style={{ padding: "10px" }} />

                            <button type="submit" className="btn btn-primary">Create Profile</button>
                        </form>
                    </div>
                )}

                {activeTab === "fighters" && (
                    <div className="fighters-list">
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                            {fighters.map((f) => (
                                <div key={f.id} className="card">
                                    <img src={f.imageUrl || "https://via.placeholder.com/150"} alt={f.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                                    <h3>{f.name}</h3>
                                    <p><strong>Role:</strong> {f.role}</p>
                                    <p><strong>Location:</strong> {f.location}</p>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <button
                                            onClick={() => handleEditFighter(f)}
                                            style={{
                                                flex: 1,
                                                padding: '8px 16px',
                                                background: 'var(--primary)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteFighter(f.id)}
                                            style={{
                                                flex: 1,
                                                padding: '8px 16px',
                                                background: '#dc3545',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Fighter Modal */}
            {showEditModal && editingFighter && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}>
                        <h2 style={{ marginBottom: '20px' }}>Edit Fighter</h2>
                        <form onSubmit={handleUpdateFighter}>
                            <input
                                name="name"
                                placeholder="Name"
                                value={editingFighter.name}
                                onChange={handleEditChange}
                                required
                                style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                            <input
                                name="role"
                                placeholder="Role"
                                value={editingFighter.role}
                                onChange={handleEditChange}
                                required
                                style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={editingFighter.description}
                                onChange={handleEditChange}
                                required
                                rows="5"
                                style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                            <input
                                name="born"
                                placeholder="Born (e.g., 2 October 1869)"
                                value={editingFighter.born || ''}
                                onChange={handleEditChange}
                                style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                            <input
                                name="died"
                                placeholder="Died (e.g., 30 January 1948)"
                                value={editingFighter.died || ''}
                                onChange={handleEditChange}
                                style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                            <input
                                name="location"
                                placeholder="Location"
                                value={editingFighter.location || ''}
                                onChange={handleEditChange}
                                style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                            <input
                                name="imageUrl"
                                placeholder="Image URL"
                                value={editingFighter.imageUrl || ''}
                                onChange={handleEditChange}
                                style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    type="submit"
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setEditingFighter(null);
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: '#6c757d',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ReactMarkdown from 'react-markdown';

export default function PreviewContribution() {
    const router = useRouter();
    const { id } = router.query;
    const [contribution, setContribution] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchContribution();
        }
    }, [id]);

    const fetchContribution = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/admin/login");
                return;
            }
            // We need an endpoint to get a single contribution.
            // Since we don't have one, we can filter from the list or add one.
            // For now, let's assume we can filter from the list if we had state management,
            // but since this is a new page, we should probably add a GET /:id route to contributionController.
            // OR, we can just fetch all pending and find it.
            const res = await axios.get("http://localhost:4000/api/contributions?status=pending", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const found = res.data.find(c => c._id === id);
            setContribution(found);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
    if (!contribution) return <div style={{ padding: '100px', textAlign: 'center' }}>Contribution not found</div>;

    // Map contribution data to fighter data structure for preview
    const fighter = {
        name: contribution.fighterName,
        role: "Freedom Fighter (Preview)",
        imageUrl: contribution.imageUrl,
        born: "Unknown", // Not in contribution form yet
        died: "Unknown", // Not in contribution form yet
        location: "India", // Not in contribution form yet
        description: contribution.content,
        activities: contribution.timeline || [],
        sources: contribution.sources || []
    };

    return (
        <div>
            <nav className="navbar">
                <div className="brand">Preview Mode</div>
                <button className="btn-primary" onClick={() => window.close()}>Close Preview</button>
            </nav>

            <div className="detail-header">
                <img
                    src={fighter.imageUrl || "https://via.placeholder.com/300x350?text=No+Image"}
                    alt={fighter.name}
                    className="detail-img"
                />
                <div className="detail-intro">
                    <h1>{fighter.name}</h1>
                    <div className="subtitle">{fighter.role}</div>

                    <div className="stats-card">
                        <div className="stat-item">
                            <label>Born</label>
                            <span>{fighter.born}</span>
                        </div>
                        <div className="stat-item">
                            <label>Died</label>
                            <span>{fighter.died}</span>
                        </div>
                        <div className="stat-item">
                            <label>Location</label>
                            <span>{fighter.location}</span>
                        </div>
                        <div className="stat-item">
                            <label>Contributions</label>
                            <span>{fighter.activities.length} Major Events</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* ... (inside component) */}

            <div className="content-section biography">
                <h2 className="section-title">Biography</h2>
                <div className="markdown-content">
                    <ReactMarkdown>{fighter.description}</ReactMarkdown>
                </div>
            </div>

            {fighter.activities && fighter.activities.length > 0 && (
                <div className="content-section">
                    <h2 className="section-title">Timeline of Activities</h2>
                    {fighter.activities.map((activity, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-icon">
                                <span>{index + 1}</span>
                            </div>
                            <div className="timeline-content">
                                <h4>{activity.title}</h4>
                                <div className="timeline-year">{activity.year}</div>
                                <p>{activity.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {fighter.sources && fighter.sources.length > 0 && (
                <div className="content-section">
                    <h2 className="section-title">Sources</h2>
                    <ul style={{ paddingLeft: "20px", color: "var(--text)", fontSize: "16px", lineHeight: "1.8" }}>
                        {fighter.sources.map((source, index) => (
                            <li key={index}>{source}</li>
                        ))}
                    </ul>
                </div>
            )}

            <footer className="footer">
                <p>The Glimpse of Bharat — An open-source chronicle of freedom.</p>
            </footer>
        </div>
    );
}

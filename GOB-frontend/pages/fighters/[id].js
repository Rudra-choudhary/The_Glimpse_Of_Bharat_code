import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import ReactMarkdown from 'react-markdown';

export default function FighterDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [fighter, setFighter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchFighter();
        }
    }, [id]);

    const fetchFighter = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/fighters/${id}`);
            if (res.ok) {
                const data = await res.json();
                setFighter(data);
            } else {
                console.error("Fighter not found");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching fighter:", error);
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
    if (!fighter) return <div style={{ padding: '100px', textAlign: 'center' }}>Fighter not found</div>;

    return (
        <div>
            <nav className="navbar">
                <div className="brand" onClick={() => router.push("/")} style={{ cursor: 'pointer' }}>The Glimpse of Bharat</div>
                <ul className="nav-links">
                    <li onClick={() => router.push("/")}>Home</li>
                    <li onClick={() => router.push("/fighters")}>Browse Fighters</li>
                    <li onClick={() => router.push("/contribute")}>Contribute</li>
                </ul>
                <button className="btn-primary" onClick={() => router.push("/login")}>Login</button>
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
                            <span>{fighter.born || "Unknown"}</span>
                        </div>
                        <div className="stat-item">
                            <label>Died</label>
                            <span>{fighter.died || "Unknown"}</span>
                        </div>
                        <div className="stat-item">
                            <label>Location</label>
                            <span>{fighter.location || "India"}</span>
                        </div>
                        <div className="stat-item">
                            <label>Contributions</label>
                            <span>{fighter.activities ? fighter.activities.length : 0} Major Events</span>
                        </div>
                    </div>
                </div>
            </div>

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

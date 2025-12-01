// pages/index.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const team = [
    { name: "Rudra Pratap Singh Choudhary", role: "Project Lead", image: "../public/team/rudra.jpg" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userName");
      if (storedUser) setUser(storedUser);
    }
    const token = localStorage.getItem("token");
    // Optional: Redirect if not logged in, or just show public view
    // if (!token) { window.location.href = "/login"; } 
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      {/* Blobs for subtle background */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Navbar */}
      <nav className="navbar home">
        <div className="brand" onClick={() => router.push("/")}>The Glimpse of Bharat</div>

        <ul className="nav-links">
          <li onClick={() => router.push("/")}>Home</li>
          <li onClick={() => router.push("/fighters")}>Database</li>
          <li onClick={() => router.push("/contribute")}>Contribute</li>
        </ul>

        <div className="nav-actions">
          {user ? (
            <div className="user-display">
              <span>Hello, <strong>{user}</strong></span>
              <button className="btn-outline small" onClick={logout}>Logout</button>
            </div>
          ) : (
            <button className="btn-primary" onClick={() => router.push("/fighters")}>
              Explore Database
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Honoring India’s Heroes: An Open-Source Chronicle of Freedom.</h1>
        <p>
          An open, public database dedicated to preserving the stories of the
          men and women who fought for India’s independence.
        </p>
      </section>

      {/* Info Cards */}
      <section className="info-cards">
        <div className="info-card">
          <div className="card-icon">📖</div>
          <h3>Our Mission</h3>
          <p>
            To create a comprehensive, accessible, and accurate digital archive
            of India’s freedom fighters for future generations.
          </p>
        </div>

        <div className="info-card">
          <div className="card-icon">🖼️</div>
          <h3>Our Vision</h3>
          <p>
            To become the definitive open-source platform for historical
            preservation, education, and community engagement in Indian history.
          </p>
        </div>

        <div className="info-card">
          <div className="card-icon">👥</div>
          <h3>Why Open Source?</h3>
          <p>
            We believe in transparency, collaboration, and community ownership
            to build a more accurate and inclusive historical record.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story">
        <div className="story-img">
          {/* Placeholder for origin image */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Statue_of_Unity.jpg/640px-Statue_of_Unity.jpg" alt="Statue of Unity" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
        </div>
        <div className="story-text">
          <h4>OUR ORIGIN</h4>
          <h2>The Story Behind the Project</h2>
          <p>
            The Glimpse of Bharat was born from a desire to make the stories of
            our nation’s heroes accessible to everyone. We noticed that while information
            existed, it was scattered and often difficult to verify. Our goal is to consolidate
            this knowledge into a single, reliable, and community-driven resource.
          </p>
          <p>
            This project is a tribute to their sacrifice and a tool for education and
            inspiration.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Meet the Team</h2>
        <p>
          We are a passionate group of historians, developers, and volunteers dedicated to
          preserving India’s rich history.
        </p>

        <div className="team-cards">
          {team.map((person, i) => (
            <div key={i} className="team-card">
              <div className="avatar">
                {/* Use a placeholder if local image fails or just use the path provided */}
                <img src={person.image} alt={person.name} className="avatar-img" onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
              </div>
              <h4>{person.name}</h4>
              <span>{person.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Get Involved */}
      <section className="involved">
        <div className="involved-content">
          <h2>Get Involved</h2>
          <p>
            This project belongs to the community. Help us grow by contributing
            research, code, or by spreading the word.
          </p>
          <button className="btn-primary dark" onClick={() => router.push("/contribute")}>
            Contribute to the Project
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>The Glimpse of Bharat</h3>
            <p>An open-source chronicle of freedom.</p>
          </div>
          <div className="footer-links">
            {/* Social icons or links could go here */}
          </div>
        </div>
        <div className="footer-bottom">
          <small>© 2024 The Glimpse of Bharat Project. Licensed under MIT.</small>
        </div>
      </footer>
    </div>
  );
}

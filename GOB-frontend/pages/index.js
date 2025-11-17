// pages/index.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const team = [
    { name: "Rudra Pratap Singh Choudhary", role: "Project Lead",image: "../public/team/rudra.jpg" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userName");
      if (storedUser) setUser(storedUser);
    }
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;}
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
        <div className="brand">The Glimpse of Bharat</div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Database</li>
          <li>About</li>
          <li>Contribute</li>
        </ul>

        {user ? (
          <div className="user-display">
            Hello, <strong>{user}</strong>
          
        <button className="btn-primary" onClick={logout}>
            logout
        </button></div>
        ) : (
          <button className="btn-primary" onClick={handleLoginClick}>
            Login
          </button>
        )}

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
          <h3>Our Mission</h3>
          <p>
            To create a comprehensive, accessible, and accurate digital archive
            of India’s freedom fighters.
          </p>
        </div>

        <div className="info-card">
          <h3>Our Vision</h3>
          <p>
            To become the definitive open-source platform for historical
            preservation, education, and community engagement.
          </p>
        </div>

        <div className="info-card">
          <h3>Why Open Source?</h3>
          <p>
            We believe in transparency, collaboration, and community ownership
            to build a more inclusive historical record.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story">
        <div className="story-img" />
        <div className="story-text">
          <h4>OUR ORIGIN</h4>
          <h2>The Story Behind the Project</h2>
          <p>
            The Glimpse of Bharat was born from a desire to make the stories of
            our nation’s heroes accessible to everyone. While information
            existed, it was scattered and often difficult to verify.
          </p>
          <p>
            Our goal is a reliable, community-driven resource — a tribute to
            their sacrifice and a tool for education and inspiration.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Meet the Team</h2>
        <p>
          A passionate group of historians, developers, and volunteers dedicated
          to preserving India’s rich history.
        </p>

        <div className="team-cards">
  {team.map((person, i) => (
    <div key={i} className="team-card">
      <img src={person.image} alt={person.name} className="avatar-img" />
      <h4>{person.name}</h4>
      <span>{person.role}</span>
    </div>
  ))}
</div>

      </section>

      {/* Get Involved */}
      <section className="involved team">
        <h2>Get Involved</h2>
        <p>
          This project belongs to the community. Help us grow by contributing
          research or code — or by spreading the word.
        </p>
        <button className="btn-primary">Contribute to the Project</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>The Glimpse of Bharat — An open-source chronicle of freedom.</p>
        <small>© 2024 The Glimpse of Bharat Project. Licensed under MIT.</small>
      </footer>
    </div>
  );
}

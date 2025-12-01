import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function BrowseFighters() {
    const [fighters, setFighters] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [roleFilter, setRoleFilter] = useState("all");
    const [locationFilter, setLocationFilter] = useState("all");
    const router = useRouter();

    useEffect(() => {
        fetchFighters();
    }, [search, pagination.page, sortBy, sortOrder, roleFilter, locationFilter]);

    const fetchFighters = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                search,
                page: pagination.page,
                limit: 20,
                sortBy,
                sortOrder,
            });

            if (roleFilter !== 'all') params.append('role', roleFilter);
            if (locationFilter !== 'all') params.append('location', locationFilter);

            const res = await fetch(`http://localhost:4000/api/fighters?${params}`);
            const data = await res.json();
            setFighters(data.fighters || []);
            setPagination(data.pagination || { total: 0, page: 1, pages: 1 });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching fighters:", error);
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination({ ...pagination, page: 1 });
        fetchFighters();
    };

    const handlePageChange = (newPage) => {
        setPagination({ ...pagination, page: newPage });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === 'name-asc') {
            setSortBy('name');
            setSortOrder('asc');
        } else if (value === 'name-desc') {
            setSortBy('name');
            setSortOrder('desc');
        } else if (value === 'role') {
            setSortBy('role');
            setSortOrder('asc');
        } else if (value === 'location') {
            setSortBy('location');
            setSortOrder('asc');
        }
        setPagination({ ...pagination, page: 1 });
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="brand" onClick={() => router.push("/")} style={{ cursor: 'pointer' }}>The Glimpse of Bharat</div>
                <ul className="nav-links">
                    <li onClick={() => router.push("/")}>Home</li>
                    <li className="active">Browse Fighters</li>
                    <li onClick={() => router.push("/contribute")}>Contribute</li>
                </ul>
                <button className="btn-primary" onClick={() => router.push("/login")}>Login</button>
            </nav>

            <div className="search-section">
                <h1>The Glimpse of Bharat</h1>
                <p>An Open Tribute to India's Freedom Fighters.</p>

                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for a freedom fighter..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="search-btn">Search</button>
                </form>

                {/* Filters and Sort */}
                <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px', display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <select
                        value={`${sortBy}-${sortOrder}`}
                        onChange={handleSortChange}
                        style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', cursor: 'pointer' }}
                    >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="role">Role</option>
                        <option value="location">Location</option>
                    </select>

                    <select
                        value={roleFilter}
                        onChange={(e) => { setRoleFilter(e.target.value); setPagination({ ...pagination, page: 1 }); }}
                        style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', cursor: 'pointer' }}
                    >
                        <option value="all">All Roles</option>
                        <option value="Revolutionary">Revolutionary</option>
                        <option value="Leader">Leader</option>
                        <option value="Activist">Activist</option>
                        <option value="Reformer">Reformer</option>
                    </select>

                    <select
                        value={locationFilter}
                        onChange={(e) => { setLocationFilter(e.target.value); setPagination({ ...pagination, page: 1 }); }}
                        style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', cursor: 'pointer' }}
                    >
                        <option value="all">All Locations</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Bengal">Bengal</option>
                        <option value="Maharashtra">Maharashtra</option>
                    </select>
                </div>
            </div>

            <div className="fighters-grid">
                {loading ? (
                    <p>Loading...</p>
                ) : fighters.length > 0 ? (
                    fighters.map((fighter) => (
                        <Link href={`/fighters/${fighter.id}`} key={fighter.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="fighter-card">
                                <img
                                    src={fighter.imageUrl || "https://via.placeholder.com/300x350?text=No+Image"}
                                    alt={fighter.name}
                                    className="fighter-img"
                                />
                                <div className="fighter-info">
                                    <h3>{fighter.name}</h3>
                                    <span className="fighter-role">{fighter.role}</span>
                                    <p style={{ fontSize: '14px', color: '#666', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {fighter.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No freedom fighters found.</p>
                )}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: '40px 0', padding: '0 20px' }}>
                    <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            background: pagination.page === 1 ? '#f5f5f5' : 'white',
                            cursor: pagination.page === 1 ? 'not-allowed' : 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Previous
                    </button>

                    <div style={{ display: 'flex', gap: '5px' }}>
                        {[...Array(pagination.pages)].map((_, i) => {
                            const pageNum = i + 1;
                            // Show first, last, current, and adjacent pages
                            if (pageNum === 1 || pageNum === pagination.pages ||
                                (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1)) {
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        style={{
                                            padding: '10px 15px',
                                            borderRadius: '8px',
                                            border: '1px solid #ddd',
                                            background: pagination.page === pageNum ? 'var(--primary)' : 'white',
                                            color: pagination.page === pageNum ? 'white' : '#333',
                                            cursor: 'pointer',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            } else if (pageNum === pagination.page - 2 || pageNum === pagination.page + 2) {
                                return <span key={pageNum} style={{ padding: '10px 5px' }}>...</span>;
                            }
                            return null;
                        })}
                    </div>

                    <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.pages}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            background: pagination.page === pagination.pages ? '#f5f5f5' : 'white',
                            cursor: pagination.page === pagination.pages ? 'not-allowed' : 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Next
                    </button>
                </div>
            )}

            <footer className="footer">
                <p>The Glimpse of Bharat — An open-source chronicle of freedom.</p>
            </footer>
        </div>
    );
}

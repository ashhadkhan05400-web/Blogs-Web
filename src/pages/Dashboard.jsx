import { useState } from "react";
import "../App.css";

export default function Dashboard() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="dashboard-page">
            <nav className="dashboard-nav">
                <h1>Dashboard</h1>

                <div className="profile-dropdown">
                    <div
                        className="profile-pic"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        JA
                    </div>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button className="dropdown-item">Create Post</button>
                            <button className="dropdown-item logout-item">Log out</button>
                        </div>
                    )}
                </div>
            </nav>

            <div className="dashboard-blogs">
                <h2>Blogs</h2>

                <div className="blog-post">
                    <h3>How I Started Learning Web Development</h3>
                    <p className="blog-meta">Posted on Sep 2, 2026</p>
                    <p className="blog-excerpt">
                        A few months ago I had zero background in tech. Here's how I went from
                        knowing nothing to building my first full stack app...
                    </p>

                    <div className="blog-engagement">
                        <button className="like-btn">
                            <span className="icon">♡</span> Like
                        </button>
                        <button className="comment-btn">
                            <span className="icon">💬</span> Comment
                        </button>
                    </div>
                </div>

                <div className="blog-post">
                    <h3>5 Lessons From Building My First Startup</h3>
                    <p className="blog-meta">Posted on Aug 20, 2026</p>
                    <p className="blog-excerpt">
                        Building a product from scratch taught me more than any course could.
                        Here are the biggest lessons I picked up along the way...
                    </p>

                    <div className="blog-engagement">
                        <button className="like-btn">
                            <span className="icon">♡</span> Like
                        </button>
                        <button className="comment-btn">
                            <span className="icon">💬</span> Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
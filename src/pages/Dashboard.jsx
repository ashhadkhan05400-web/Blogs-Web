import { useEffect, useState } from "react";
import "../App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../other_services/firebaseconfiguration";
import DashboardSkeleton from "../components/Dashboardloading";
import toastify from "../other_services/toastify";

export default function Dashboard() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false);
    const [userData, setUserData] = useState(null)
    const [minTimeDone, setMinTimeDone] = useState(false)
    const navigate = useNavigate();
    const auth = getAuth()

    useEffect(() => {
        const getuser = onAuthStateChanged(auth, async (currentuser) => {
            setUser(currentuser);

            if (currentuser) {
                const userdoc = doc(db, "users", currentuser.uid)
                const usersnap = await getDoc(userdoc)

                if (usersnap.exists()) {
                    setUserData(usersnap.data())
                }
            }

            setAuthReady(true)
        });
        return () => getuser()
    }, [auth])

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimeDone(true)
        }, 2000);
        return () => clearTimeout(timer)
    }, [])

    const authloading = !authReady || !minTimeDone

    const handleblogcreation = () => {
        if (!user) {
            navigate('/Login')
            toastify("You are not log in so you can not post a blog", "error")
        }
        else {
            navigate('/Dashboard/CreatePost')
        }
    }

    const logout = () => {
        auth.signOut()
        toastify("Logged out " , "success")
        navigate('/Login')
    }
    if (authloading) return <DashboardSkeleton />
    return (
        <div className="dashboard-page">
            <nav className="dashboard-nav">
                <h1>Dashboard</h1>

                <div className="profile-dropdown">
                    <div className="profile-pic" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {userData?.PhotoURL || userData?.photoURL ? (
                            <img
                                src={userData.PhotoURL}
                                alt="profile"
                                className="profile-pic-img"
                                 referrerPolicy="no-referrer"
                            />
                        ):(
                            userData?.name ? userData.name.charAt(0).toUpperCase() : "U"
                        )}

                    </div>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={handleblogcreation}>Create Post</button>
                            {user ? (
                                <button className="dropdown-item logout-item" onClick={logout}>
                                    Log out
                                </button>
                            ) : (
                                <Link to={'/Login'} className="dropdown-item logout-item">
                                    Log in
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            <div className="dashboard-blogs">
                <h2>Blogs</h2>
<div className="blog-post">
    <div className="blog-author">
        <div className="blog-author-initial">JA</div>
        <span className="blog-author-name">Jane Doe</span>
    </div>

    <h3>How I Started Learning Web Development</h3>
    <p className="blog-meta">Posted on Sep 2, 2026</p>
    <p className="blog-excerpt">
        A few months ago I had zero background in tech. Here's how I went from
        knowing nothing to building my first full stack app...
    </p>

    <div className="blog-engagement">
        <button className="like-btn"><span className="icon">♡</span> Like</button>
        <button className="comment-btn"><span className="icon">💬</span> Comment</button>
    </div>
</div>

<div className="blog-post">
    <div className="blog-author">
        <div className="blog-author-initial">JA</div>
        <span className="blog-author-name">Jane Doe</span>
    </div>

    <h3>5 Lessons From Building My First Startup</h3>
    <p className="blog-meta">Posted on Aug 20, 2026</p>
    <p className="blog-excerpt">
        Building a product from scratch taught me more than any course could.
        Here are the biggest lessons I picked up along the way...
    </p>

    <div className="blog-engagement">
        <button className="like-btn"><span className="icon">♡</span> Like</button>
        <button className="comment-btn"><span className="icon">💬</span> Comment</button>
    </div>
</div>
            </div>
        </div>
    );
}
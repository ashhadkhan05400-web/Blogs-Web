import { useEffect, useState } from "react";
import "../App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { collection, doc, query, getDoc, getDocs, orderBy } from "firebase/firestore";
import { auth, db } from "../other_services/firebaseconfiguration";
import DashboardSkeleton from "../components/Dashboardloading";
import toastify from "../other_services/toastify";

export default function Dashboard() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false);
    const [userData, setUserData] = useState(null)
    const [minTimeDone, setMinTimeDone] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [blogsLoading, setBlogsLoading] = useState(false)
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

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const blogsref = collection(db, "blogs")
                const q = query(blogsref, orderBy("createdAt", "desc"))
                const snapshot = await getDocs(q)

                const bloglist = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setBlogs(bloglist)
            } catch (error) {
                toastify(error.message, "error")
            }
            finally {
                setBlogsLoading(false)
            }
        }

        fetchdata()
    }, [])


    const authloading = !authReady || !minTimeDone

    const formatDate = (timestamp) => {
        if (!timestamp) return ""
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
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
        toastify("Logged out ", "success")
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
                        ) : (
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

                {blogsLoading ? (
                    <p>Loading blogs...</p>
                ) : blogs.length === 0 ? (
                    <p>No blogs yet. Be the first to post!</p>
                ) : (
                    blogs.map((blog) => (
                        <div className="blog-post" key={blog.id}>
                            <div className="blog-author">
                                {blog.authorPhoto ? (
                                    <img
                                        src={blog.authorPhoto}
                                        alt={blog.authorName}
                                        className="blog-author-img"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="blog-author-initial">
                                        {blog.authorName ? blog.authorName.charAt(0).toUpperCase() : "U"}
                                    </div>
                                )}
                                <span className="blog-author-name">{blog.authorName}</span>
                            </div>

                            {blog.coverimg && (
                                <img src={blog.coverimg} alt={blog.title} className="blog-cover-img" />
                            )}

                            <h3>{blog.title}</h3>
                            <p className="blog-meta">Posted on {formatDate(blog.createdAt)}</p>
                            <p className="blog-excerpt">
                                {blog.content.length > 150
                                    ? blog.content.slice(0, 150) + "..."
                                    : blog.content}
                            </p>

                            <div className="blog-engagement">
                                <button className="like-btn"><span className="icon">♡</span> Like</button>
                                <button className="comment-btn"><span className="icon">💬</span> Comment</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
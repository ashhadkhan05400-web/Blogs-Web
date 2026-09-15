import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useEffect, useState } from "react";
import toastify from "../other_services/toastify";
import { uploadImageToCloudinary } from "../other_services/cloudinary";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { db, auth } from "../other_services/firebaseconfiguration";
import { onAuthStateChanged } from "firebase/auth";
import { Createpostskelton } from "../components/Createpostskelton";


export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [coverimg, setCoverImg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [authReady, setAuthReady] = useState(false)
  const [user, setUser] = useState(null)
  const [content, setContent] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const finduser = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => finduser()
  }, [])


  const postblog = async (e) => {
    e.preventDefault()
    try {
      if (!title || !content) {
        toastify("All fields are required !", "error")
        return;
      }

      setLoading(true)

      let coverimgurl = ""
      if (coverimg) {
        coverimgurl = await uploadImageToCloudinary(coverimg)
      }

      await addDoc(collection(db, "blogs"), {
        title: title.trim(),
        content: content.trim(),
        coverimg: coverimgurl,
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        authorPhoto: user.photoURL || "",
        createdAt: serverTimestamp(),
        likes: 0,
      });
      setTitle("")
      setContent("")
      setCoverImg(null)
      toastify("Blog published successfully!", "success");
      navigate('/Dashboard')
    }
    catch (err) {
      toastify(err.message, "error")
    }
    finally {
      setLoading(false)
    }
  }
  if (!authReady) {
    <Createpostskelton />
  }
  return (
    <div className="create-post-page">
      <div className="create-post-header">
        <Link to="/Dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
        <h1>Create a new blog</h1>
        <p className="create-subtitle">Share your thoughts with the world</p>
      </div>

      <form className="create-post-card" onSubmit={postblog}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Give your blog a clear title"
          />
        </div>

        <div className="field">
          <label htmlFor="cover">Cover image (optional)</label>
          <input
            id="cover"
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImg(e.target.files[0])} 
            className="pfp-input"
          />
        </div>

        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className="content-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog here..."
            rows={12}
          />
        </div>

        <div className="create-post-actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="publish-btn" disabled={loading}>
            {loading ? "Publishing...." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
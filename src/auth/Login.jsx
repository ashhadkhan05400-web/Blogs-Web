import "../App.css";
import toastify from "../other_services/toastify";
import { auth, provider } from "../other_services/firebaseconfiguration";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const loginhandler = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            toastify("All fields are required", "error")
            return;
        }
        setLoading(true)
        try {

            await signInWithEmailAndPassword(auth, email, password)
            toastify("Logged in", "success")
            navigate("/Login/Dashboard")
        }
        catch (err) {
            toastify(err.message, "error")
        }
        finally {
            setLoading(false)
        }
    }

    const loginwithgoogle = async () => {
        try {
            await signInWithPopup(auth, provider)
            toastify("Logged in", "success");
            navigate("/Login/Dashboard");
        }
        catch (err) {
            toastify(err.message, "error")
        }
    }

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={loginhandler}>
                <h1>Welcome back</h1>
                <p className="login-subtitle">Log in to keep writing.</p>

                <div className="login-field">
                    <label htmlFor="email">Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="jane@example.com" />
                </div>

                <div className="login-field">
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="Your password" />
                </div>

                <button type="submit" disabled={loading}>{loading ? "Logging in...." : "Log in"}</button>

                <div className="login-divider">
                    <span>or</span>
                </div>

                <button onClick={loginwithgoogle} type="button" className="login-google-btn">
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.91c1.7-1.57 2.69-3.88 2.69-6.64z" />
                        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.91-2.27c-.81.54-1.84.86-3.05.86-2.35 0-4.34-1.58-5.05-3.71H.96v2.34C2.44 15.98 5.48 18 9 18z" />
                        <path fill="#FBBC05" d="M3.95 10.71a5.4 5.4 0 0 1 0-3.42V4.95H.96a9 9 0 0 0 0 8.1l2.99-2.34z" />
                        <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l2.99 2.34C4.66 5.16 6.65 3.58 9 3.58z" />
                    </svg>
                    Continue with Google
                </button>

                <p className="login-terms">By continuing you agree to the Terms and Privacy Policy.</p>
            </form>
        </div>
    );
};
import { useState } from "react";
import "../App.css";
import toastify from "../other_services/toastify";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    getAdditionalUserInfo,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth, provider } from "../other_services/firebaseconfiguration";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const submitfunction = async (e) => {
        e.preventDefault();
        setLoading(true)


        try {

            if (!email || !name || !password) {
                toastify("All fields are required", "error")
                return;
            }

            let userdetails = await createUserWithEmailAndPassword(auth, email, password);
            let user = userdetails.user;

            await setDoc(doc(db, "users", userdetails.user.uid), {
                name: name,
                email: email,
                createdAt: serverTimestamp(),
            })


            setEmail("")
            setPassword("")
            setName("")
            toastify("Account created Successfully", "success")
            navigate("./Login")
        }
        catch (err) {
            toastify(err.message, "error")
        }
        finally {
            setLoading(false)
        }
    }
    const signupwithgoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            const additionaluserinfo = getAdditionalUserInfo(result)

            if (!additionaluserinfo.isNewUser) {
                toastify("Account already exists, logging you in instead", "info");
                navigate("/Login");
                return;
            }
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                name: user.displayName || "",
                createdAt: serverTimestamp()
            })

            toastify("Signed up with Google", "success");
            navigate("/Login");

        }
        catch (err) {
            toastify(err.message, "error")
        }
    }
    return (
        <div className="signup-page">
            <form className="signup-card" onSubmit={submitfunction}>
                <h1>Start your blog</h1>
                <p className="subtitle">Free to join. Takes about a minute.</p>

                <div className="field">
                    <label htmlFor="name">Full name</label>
                    <input value={name} id="name" type="text" onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
                </div>

                <div className="field">
                    <label htmlFor="email">Email address</label>
                    <input id="email" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" disabled={loading}>{loading ? "Creating account...." : "Create account"}</button>


                <div className="divider">
                    <span>or</span>
                </div>
                <button onClick={signupwithgoogle} type="button" className="google-btn">
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.91c1.7-1.57 2.69-3.88 2.69-6.64z" />
                        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.91-2.27c-.81.54-1.84.86-3.05.86-2.35 0-4.34-1.58-5.05-3.71H.96v2.34C2.44 15.98 5.48 18 9 18z" />
                        <path fill="#FBBC05" d="M3.95 10.71a5.4 5.4 0 0 1 0-3.42V4.95H.96a9 9 0 0 0 0 8.1l2.99-2.34z" />
                        <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l2.99 2.34C4.66 5.16 6.65 3.58 9 3.58z" />
                    </svg>
                    Continue with Google
                </button>
                <p className="terms">By continuing you agree to the Terms and Privacy Policy.</p>
            </form>




        </div>
    );
}
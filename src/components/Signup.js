import React, { useState } from "react";
import "../style/Signup.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import logo from "../img/medisync_logo.png";
import { FaGoogle } from "react-icons/fa";
import { signupUser } from "../api/authService";
import login_image from '../img/medisync_login_image.png';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(""); // Reset error before attempting login
        console.log({ firstName, lastName, email, password }); // Replace with API call
        setLoading(true); // Start loading
        try {
            const data = await signupUser(firstName, lastName, email, password);
            if (data?.data?.userId) {
                localStorage.setItem("token", data.token); // Store token for authentication
                navigate("/login"); // Redirect after login (change to your route)
            } else {
                setLoading(false);
                setError("Signup failed.");
            }
        } catch (err) {
            setLoading(false);
            setError(err.response.data.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-left">
                {/* <div className="platform-icons">
                    <div className="icon apple"></div>
                    <div className="icon firefox"></div>
                    <div className="icon android"></div>
                    <div className="icon chrome"></div>
                    <div className="icon windows"></div>
                </div> */}
                <img src={login_image} alt="MediSync img" className="login-img" />
            </div>

            <div className="signup-right">
                <div className="signup-box">
                    <img src={logo} alt="MediSync Logo" className="logo" />
                    <h1>Sign Up</h1>
                    <form className="signup-form" onSubmit={handleSignup}>
                        <label>First Name</label>
                        <input type="text" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

                        <label>Last Name</label>
                        <input type="text" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

                        <label>Email ID</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />




                        <button className="signup-button" type="submit"
                            disabled={loading} >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>




                        {/* <button className="google-signup">
                            <FaGoogle className="google-icon" /> Sign up with Google
                        </button> */}
                        {/* Show error message if login fails */}
                        {error && <p className="error-message">{error}</p>}
                    </form>

                    <p className="login-text">Already have an account? <a href="/login">Login</a></p>
                    <p className="privacy-policy"><a href="#">Privacy Policy</a></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

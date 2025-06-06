import React, { useState } from "react";
import "../style/Login.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";  // Import useNavigate
import login_image from '../img/medisync_login_image.png';
import { loginUser } from "../api/authService";
import { FaGoogle } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGlobe } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { getPagesAPI } from '../api/getAllPageAPI.js';
import webSocketService from "../api/websocketService";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleForgotClick = () => {
        navigate('/forgot');
    };

    // const handleClick = () => {
    //     setLoading(true);
    //     // Simulate loading time (3–4 seconds)
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 3000); // 3 seconds
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error before attempting login
        setLoading(true); // Start loading

        try {
            const data = await loginUser(email, password);
            // console.log("loginUser data.............", data);
            if (data?.data?.userId) {
                localStorage.setItem("token", data.token); // Store token for authentication
                localStorage.setItem("userId", data.data.userId); // Store token for authentication
                localStorage.setItem("email", data.data.email); // Store token for authentication
                localStorage.setItem("userDetails", JSON.stringify(data.data));
                // console.log("data?.data?.changePassword", data?.data?.changePassword);
                if (data?.data?.changePassword == true) {
                    navigate("/change-password");
                } else {
                    if (!!data?.data?.email) {
                        webSocketService.connect(data.data.email);
                    }
                    try {
                        const response = await getPagesAPI();
                        if (response?.data?.length > 0) {
                            console.log("response?.data?.length", response?.data?.length);
                            navigate("/getAllPage"); // Redirect after login (change to your route)
                        } else {
                            navigate("/"); // Redirect after login (change to your route)
                        }
                    } catch (err) {
                        navigate("/"); // Redirect after login (change to your route)
                    }
                }
            } else {
                setLoading(false);
                setError("Login failed, Please try again.");
            }
        } catch (err) {
            setError(err.message || "Login failed.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                {/* <div className="logo-container">
                    <img src={logo} alt="MediSync Logo" className="logo" />
                </div>
                <div className="platform-icons">
                    <div className="icon apple"></div>
                    <div className="icon firefox"></div>
                    <div className="icon android"></div>
                    <div className="icon chrome"></div>
                    <div className="icon windows"></div>
                </div> */}

                <img src={login_image} alt="MediSync img" className="login-img" />

            </div>

            <div className="login-right">
                <div className="login-box">
                    <h1 className="brand-name">MediSync</h1>
                    <form className="login-form" onSubmit={handleLogin}>
                        <label>Email ID</label>
                        <input type="email" placeholder="Enter your email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required />

                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required />

                        <div className="forgot-password">
                            <a onClick={handleForgotClick}>Forget Password?</a>
                        </div>


                        {/* <button className="login-button">LOGIN</button> */}
                        {/* Login Button with Loader */}
                        {/* <button
                            className="login-button loader"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "LOGIN"}
                        </button> */}


                        {loading ? (
                            <div className="button-spinner"></div> // Only spinner shown
                        ) : (
                            <button disabled={loading} type="submit" className="login-button">
                                Login
                            </button>
                        )}

                        {/* <button className="google-login">
                            Sign in with Google
                        </button> */}

                        {/* <button className="google-login">
                            <FaGoogle /> Sign in with Google
                        </button> */}

                        {/* Show error message if login fails */}
                        {error && <p className="error-message">{error}</p>}

                    </form>

                    <p className="signup-text">
                        Do not have an account? <Link to="/signup">Sign up</Link>
                    </p>
                    <p className="privacy-policy"><a href="#" className="privacy-policy">Privacy Policy</a></p>
                </div>
            </div>
        </div >
    );
};

export default Login;

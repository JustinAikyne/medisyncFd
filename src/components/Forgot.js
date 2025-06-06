import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Forgot.css"; // Import the CSS file
import forgot_image from "../img/forgot_password.jpg";
import medisync_logo from '../img/medisync_logo.png';
import { sendResetEmail } from "../api/authService";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        console.log("email", email);

        try {
            const response = await sendResetEmail(email); // API call to send reset email
            if (response) {
                setMessage(response.message);
                navigate("/login");
            } else {
                setError("Failed to send reset email. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="forgot-container">
            <div className="forgot-left">
                <img src={forgot_image} alt="MediSync Reset Password" className="forgot-img" />
            </div>

            <div className="forgot-right">
                <div className="forgot-box">
                    {/* <h1 className="brand-name">MediSync</h1> */}
                    <img src={medisync_logo} alt="MediSync Logo" className="logo" />
                    <h2 className="forgot-title">Forgot your Password?</h2>

                    <form className="forgot-form" onSubmit={handleForgotPassword}>
                        <label className="forgot-label">Email ID</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {loading ? (
                            <div className="button-spinner"></div>
                        ) : (
                            <button type="submit" className="reset-button">
                                Reset Password
                            </button>
                        )}

                        {error && <p className="error-message">{error}</p>}
                        {message && <p className="success-message">{message}</p>}
                    </form>

                    <p className="login-text">
                        Remember your password? <span onClick={() => navigate("/login")} className="login-link">Login</span>
                    </p>
                    {/* <p className="privacy-policy"><a href="#">Privacy Policy</a></p> */}
                </div>
            </div>
        </div>
    );
};

export default Forgot;

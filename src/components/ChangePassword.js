import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/ChangePassword.css"; // Import the CSS file
import change_image from "../img/forgot_password.jpg";
import { getPagesAPI } from '../api/getAllPageAPI.js';

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            currentPassword,
            newPassword,
            confirmNewPassword,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Password changed successfully!");
        setEmail("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
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
      } else {
        setError(data?.message || "Failed to change password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="change-container">
      <div className="change-left">
        <img src={change_image} alt="MediSync Change Password" className="change-img" />
      </div>

      <div className="change-right">
        <div className="change-box">
          <h1 className="brand-name">MediSync</h1>
          <h2>Change Password</h2>
          <p>Update your password to keep your account secure.</p>

          <form className="change-form" onSubmit={handleChangePassword}>
            <label>Email ID</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />

            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />

            {loading ? (
              <div className="button-spinner"></div>
            ) : (
              <button type="submit" className="change-button">
                CHANGE PASSWORD
              </button>
            )}

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
          </form>

          <p className="login-text">
            Go back to <span onClick={() => navigate("/login")} className="login-link">Login</span>
          </p>
          <p className="privacy-policy"><a href="#">Privacy Policy</a></p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

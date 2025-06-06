import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import logo from '../img/medisync_logo.png';
import Profile from '../img/messi.jpg';
import '../style/Header.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const dropdownRef = useRef();
    const userId = localStorage.getItem("userId");
    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
    const navigate = useNavigate(); // Use navigate for routing

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    useEffect(() => {
        let ignore = false;

        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            if (userId && !ignore) {
                try {
                    const res = await axios.get(`https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com/dev/api/user/${userId}`);
                    if (!ignore) {
                        setUserData(res.data);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchUserData();

        return () => {
            ignore = true;
        };
    }, []);


    const handleLogout = () => {
        console.log("Logout clicked");
        localStorage.clear(); // Remove authentication token
        navigate("/login"); // Redirect to login page
    };


    return (
        <header className="header">
            <div className="header-left">
                <img src={logo} alt="Logo" className="header-logo" />
            </div>
            <div className="header-search-container">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search across medisync"
                    className="header-search"
                />
            </div>





            <div className="header-right" ref={dropdownRef}>
                <FontAwesomeIcon icon={faBell} className="header-bell-icon" />
                <img
                    src={Profile}
                    alt="Profile"
                    className="header-profile"
                    onClick={toggleDropdown}
                />
                <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" onClick={toggleDropdown} />

                {dropdownVisible && userData && (

                    <div className="profile-dropdown">
                        <div className="profile-info">
                            <div className="profile-name">
                                <i class="fa-solid fa-user"></i> {userData.firstName} {userData.lastName}
                            </div>
                            <div className="profile-email"><i class="fa-solid fa-envelope"></i> {userData.email}</div>

                            <div className="sidebar-item"><i class="fa-solid fa-gears"></i> Settings</div>

                            <div className="sidebar-item" onClick={handleLogout} ><i class="fa-solid fa-right-from-bracket"></i> Log out</div>

                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

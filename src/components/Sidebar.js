import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faGlobe, faTasks, faTools, faEye, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selected, setSelected] = useState("Web");
    const navigate = useNavigate(); // Use navigate for routing

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSelect = (option) => {
        setSelected(option);
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        localStorage.clear(); // Remove authentication token
        navigate("/login"); // Redirect to login page
    };

    return (
        <aside className="sidebar">
            <div className="toggle-container">
                <button
                    className={selected === "Web" ? "button active" : "button"}
                    onClick={() => handleSelect("Web")}
                >
                    <i className="fa-solid fa-globe"></i> Web
                </button>
                <button
                    className={selected === "App" ? "button active" : "button"}
                    onClick={() => handleSelect("App")}
                >
                    <i className="fa-solid fa-mobile-screen"></i> App
                </button>
            </div>
            <div className="sidebar-content">
                <div className="sidebar-section">
                    <div className="sidebar-header" onClick={toggleDropdown}>
                        <h3 className="sidebar-title">
                            <i className="fa-solid fa-person"></i> Accessibility Testing 
                            <FontAwesomeIcon
                                icon={isDropdownOpen ? faChevronUp : faChevronDown}
                                className="dropdown-icon"
                            />
                        </h3>
                    </div>
                    {isDropdownOpen && (
                        <ul className="sidebar-menu">
                            <li
                                className="sidebar-item"
                                onClick={() => navigate('/getAllPage')} // Navigate to ScanDetails
                            >
                                <FontAwesomeIcon icon={faGlobe} className="sidebar-icon" />
                                Website Scanner
                            </li>
                            <li className="sidebar-item">
                                <FontAwesomeIcon icon={faTasks} className="sidebar-icon" />
                                Workflow Analyzer
                            </li>
                            <li className="sidebar-item">
                                <FontAwesomeIcon icon={faTools} className="sidebar-icon" />
                                Assisted Tests
                            </li>
                            <li className="sidebar-item">
                                <FontAwesomeIcon icon={faEye} className="sidebar-icon" />
                                Screen Readers
                            </li>
                            <li className="sidebar-item">
                                <FontAwesomeIcon icon={faTasks} className="sidebar-icon" />
                                Automated Tests
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <div className="sidebar-footer">
                <ul>
                    <li className="sidebar-item">
                        
                        <FontAwesomeIcon icon={faCogs} className="sidebar-icon" />
                        Settings
                    </li>
                    <li className="sidebar-item" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon"  />
                        Log out
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;

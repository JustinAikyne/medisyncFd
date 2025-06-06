import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Content.css';
import index_banner from '../img/index_banner.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

const Content = () => {
    const navigate = useNavigate();
    const isFetched = useRef(false); // Prevent multiple calls

    let token = localStorage.getItem("token");
    // console.log("token", token);


    useEffect(() => {
        if (isFetched.current) return;
        if (!token) {
            navigate('/login');
        }
    }, []);


    const handleCreateScanClick = () => {
        navigate('/create-scan');
    };

    return (
        <div className="content-container">
            {/* Header Section */}
            <h1 className='title'>Accessibility Testing</h1>

            <div className="content-header">
                <p className="content-subtitle">
                    <span className="content-title">Website Scanner</span>
                    <br>
                    </br>
                    {/* Scan up to 10,000 pages in one go. */}
                </p>

                {/* <button className="download-button">
                    <FontAwesomeIcon icon={faPuzzlePiece} />
                    Download Extension
                </button> */}
            </div>

            {/* Card Section */}
            <div className="content-card">
                <div className="card-text">
                    <h2>Create your first scan</h2>
                    <p>
                        Set up recurring scans to
                        track your website's accessibility health and monitor your progress.
                    </p>
                    <button className="create-scan-button" onClick={handleCreateScanClick} >

                        + Create a new Scan
                    </button>
                </div>
                <div className="card-image">
                    <img
                        src={index_banner} // Replace with the actual path to your image
                        alt="Illustration"
                    />
                </div>
            </div>
        </div>
    );
};

export default Content;
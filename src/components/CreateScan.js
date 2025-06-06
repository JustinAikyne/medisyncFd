import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiscardPopup from "./DiscardPopup"; // Import the popup component
import '../style/CreateScan.css';
import { scanpage } from "../api/createScanAPI";
import { saveScanAPI, scanAPI } from "../api/saveScanAPI";
import webSocketService from "../api/websocketService";

const CreateScan = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('manually');
    const [sitemapURL, setSitemapURL] = useState('');
    const [PageURL, setPageURL] = useState('');
    const [showPageURLCard, setShowPageURLCard] = useState(false);
    const [showSitemapCard, setShowSitemapCard] = useState(false);
    const [Showscan_details, setShowscan_details] = useState(false);
    const [frequency, setFrequency] = useState('Monthly');
    const [recurring, setRecurring] = useState(false);
    const [showDiscardPopup, setShowDiscardPopup] = useState(false); // State to control popup visibility
    const [error, setError] = useState("");
    const [sitemapdata, setSitemapData] = useState('');
    const [selectedUrls, setSelectedUrls] = useState([]);
    const [scanName, setScanName] = useState("");
    const [version, setVersion] = useState("2.0");
    const [level, setLevel] = useState("A");
    const [repeatDay, setRepeatDay] = useState("12");
    const [repeatTime, setRepeatTime] = useState("15:00");
    const [userId, setUserId] = useState("");
    const [isScoketConnected, setIsScoketConnected] = useState(false);




    // Robust URL validation
    const isValidURL = (url) => {
        const pattern = new RegExp(
            '^(https?:\\/\\/)?' +
            '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' +
            'localhost|' +
            '\\d{1,3}(\\.\\d{1,3}){3})' +
            '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$',
            'i'
        );
        return !!pattern.test(url);
    };

    const handleAddSitemap = async (e) => {
        e.preventDefault();
        if (isValidURL(sitemapURL)) {
            setShowSitemapCard(true);
            setError("");

            try {
                const data = await scanpage(sitemapURL); // Fetch sitemap data
                setSitemapData(data.urls || []);
                localStorage.setItem("token", JSON.stringify(data)); // Store data
            } catch (err) {
                setError(err.message || "Scan failed.");
            }
        }
    };

    const handleCheckboxChange = (url) => {
        console.log("url.......", url)
        // setSelectedUrls([url]);
        setSelectedUrls((prev) =>
            prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
        );
    };

    const checkSocketConnection = () => {
        const email = localStorage.getItem("email");
        if (email) {
            webSocketService.connect(email);
            setIsScoketConnected(true);
        }
    };

    useEffect(() => {
        const userid = localStorage.getItem("userId");
        console.log("userid", userid);
        setUserId(userid);
    }, []);

    const handleScanDetails = async () => {

        // console.log("sitemapURL............:",JSON.stringify(sitemapURL))

        const requestData = {
            name: scanName || "Home Page",
            pageUrl: sitemapURL,
            allPageUrls: selectedUrls,
            userId: userId,
            level: level,
            version: version,
            recurringEnabled: recurring,
            frequency: recurring ? frequency : null,
            repeatDay: recurring ? repeatDay : null,
            repeatTime: recurring ? repeatTime : null,
        };

        // console.log("Sending request............:", requestData);


        try {
            const data = await saveScanAPI(requestData); // Fetch sitemap data
            console.log("data", data?.data);
            // if (!!data?.data?.email) {
            //     webSocketService.connect(data.data.email);
            // }

            if (data?.data?.[0]?.id) {
                // console.log("......................................")
                console.log("data[0].id", data.data[0].id);
                scanAPI({ "scanId": data.data[0].id });
            }
            setSitemapData(data.urls || []);
            // localStorage.setItem("token", JSON.stringify(data)); // Store data

        } catch (err) {
            console.log("error", err);
            setError(err.message || "Scan failed.");
        }
        setTimeout(() => {
            navigate('/getAllPage');
        }, 2000);
    };

    const handleAddPage = () => {
        if (isValidURL(PageURL)) {
            setShowscan_details(true); // Show the Page URL card
            setSelectedUrls([PageURL]);
            setSitemapURL(PageURL);
        }
        // console.log("selectedUrls........", selectedUrls);
    };

    const scan_details = () => {
        setShowSitemapCard(false); // Show the Sitemap card when the button is clicked
        setShowPageURLCard(false); // Show the Sitemap card when the button is clicked
        setShowscan_details(true); // Show the Sitemap card when the button is clicked
        // setSelectedUrls([PageURL]);
        // setSitemapURL(PageURL);
        // console.log("selectedUrls........", selectedUrls);
    };

    const handleDiscardClick = () => {
        setShowDiscardPopup(true); // Show the popup
    };

    const handleConfirmDiscard = () => {
        setShowDiscardPopup(false); // Hide the popup
        navigate("/scan-details"); // Navigate to another page
    };

    const handleCancel = () => {
        setShowDiscardPopup(false); // Close the popup
    };

    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
    };

    const resetTabFields = (tab) => {
        setError('');

        if (tab === 'manually') {
            setPageURL('');
            setSelectedUrls([]);
            setShowscan_details(false);
            setShowSitemapCard(false); // ensure sitemap view is hidden
        }

        if (tab === 'sitemap') {
            setSitemapURL('');
            setSitemapData([]);
            setSelectedUrls([]);
            setShowSitemapCard(false);
            setShowscan_details(false);
        }
    };

    return (
        <div className="content-container">
            {/* Header Section */}
            <h1 className="title">Accessibility Testing</h1>

            <div className="content-header">
                <p>
                    <span className="content-title">Create a new Scan</span> <br />
                </p>
                <button className="back-button1" onClick={handleDiscardClick}>
                    Discard
                </button>
                {/* Discard Popup */}
                <DiscardPopup
                    show={showDiscardPopup}
                    onConfirm={handleConfirmDiscard}
                    onCancel={handleCancel}
                />
            </div>

            <div className="main-layout">
                {/* Left Section */}
                <div className="card-container">
                    <div className="card-title">
                        <p><b>Add pages to scan</b></p>
                    </div>
                    <div className="tabs1">
                        <button
                            className={activeTab === 'manually' ? 'tab active' : 'tab'}
                            onClick={() => {
                                setActiveTab('manually');
                                resetTabFields('manually');
                            }}
                        >
                            Add Manually
                        </button>
                        <button
                            className={activeTab === 'sitemap' ? 'tab active' : 'tab'}
                            onClick={() => {
                                setActiveTab('sitemap');
                                resetTabFields('sitemap');
                            }}
                        >
                            Add via Sitemap
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'manually' ? (
                            <div>
                                <p>Enter page URL</p>
                                <input className="url-input" type="text"
                                    value={PageURL}
                                    onChange={(e) => setPageURL(e.target.value)}
                                    placeholder="Enter a valid URL"
                                />
                                <div className="actions">
                                    <button
                                        className={`add-button ${isValidURL(PageURL) ? 'active' : ''}`}
                                        disabled={!isValidURL(PageURL)}
                                        onClick={handleAddPage}
                                    > Add Page
                                    </button>

                                    {/* <button className="upload-button"><b>Upload CSV</b></button> */}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p>Enter sitemap URL</p>
                                <input className="url-input"
                                    type="text"
                                    value={sitemapURL}
                                    onChange={(e) => setSitemapURL(e.target.value)}
                                    placeholder="Enter a valid URL"
                                />
                                <div className="actions">
                                    <button
                                        className={`add-button ${isValidURL(sitemapURL) ? 'active' : ''}`}
                                        disabled={!isValidURL(sitemapURL)}
                                        onClick={handleAddSitemap}
                                    >
                                        Add Sitemap
                                    </button>
                                    {/* <button className="upload-button"><b>Upload via XML</b></button> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* sitemap Right Section */}
                {/* Sitemap Display */}
                {showSitemapCard && (
                    <div className="sitemap-card">
                        <h3>Sitemap of {sitemapURL}</h3>
                        <div className="sitemap-list">
                            <ul>
                                {sitemapdata.length > 0 ? (
                                    sitemapdata.map((url, index) => (
                                        <li key={index}>
                                            <input
                                                type="checkbox"
                                                className="checkbox-tick"
                                                checked={selectedUrls.includes(url)}
                                                onChange={() => handleCheckboxChange(url)}
                                            />
                                            {url}
                                        </li>
                                    ))
                                ) : (
                                    <p>No URLs found.</p>
                                )}
                            </ul>
                        </div>
                        <button className="next-button" onClick={scan_details}>Next</button>
                    </div>
                )}

                {/* Page URL Right Section */}

                {/* {showPageURLCard && (
                    <div className="page-url-card">
                        <h3>1 page added</h3>
                        <div className="page-url-list">
                            <div className="page-url-item">
                                <p className="page-url-link">{sitemapURL}<button className="delete-button">
                                </button></p>

                            </div>
                        </div>
                        <button className="next-button-manually" onClick={scan_details}>Next</button>
                    </div>
                )} */}

                {Showscan_details && (
                    <div className="scan-details-card">
                        <h3>Confirm scan details</h3>
                        <div className="scan-details-grid">
                            {/* Left Section */}
                            <div className="left-section">
                                <div className="detail-item">
                                    <label htmlFor="scan-name">Scan name</label>
                                    <input
                                        className="scan-name-input"
                                        type="text"
                                        id="scan-name"
                                        onChange={(e) => setScanName(e.target.value)}
                                    />
                                </div>
                                <div className="detail-item">
                                    <label htmlFor="scan-version">Scan version</label>
                                    <select id="scan-version" value={version} onChange={(e) => setVersion(e.target.value)}>
                                        <option value="2.0">2.0</option>
                                        <option value="2.1">2.1</option>
                                        <option value="2.2">2.2</option>
                                    </select>
                                </div>

                                <div className="detail-item">
                                    <label htmlFor="scan-version">Level</label>
                                    <select id="scan-level" value={level} onChange={(e) => setLevel(e.target.value)}>
                                        <option value="A">A</option>
                                        <option value="AA">AA</option>
                                        <option value="AAA">AAA</option>
                                    </select>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="right-section">
                                {/* <div className="recurring-toggle">
                                    <label htmlFor="recurring-toggle">Enable recurring scans</label>
                                    <input className='checkbox-tick'
                                        type="checkbox"
                                        id="recurring-toggle"
                                        checked={recurring}
                                        onChange={() => setRecurring(!recurring)}
                                    />
                                </div> */}

                                {/* Recurring Options Below Toggle */}
                                {recurring && (
                                    <div className="recurring-options">
                                        <div className="frequency-buttons">
                                            {['Monthly', 'Weekly', 'Daily'].map((option) => (
                                                <button
                                                    key={option}
                                                    className={`recurring-frequency ${frequency === option ? 'active' : ''}`}
                                                    onClick={() => setFrequency(option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="repeat-scan">
                                            <label htmlFor="repeat-day">Repeat scan every month on</label>
                                            <div className="date-time">
                                                <select value={repeatDay} onChange={(e) => setRepeatDay(e.target.value)}>
                                                    {[...Array(31).keys()].map((day) => (
                                                        <option key={day + 1} value={day + 1}>
                                                            {day + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label htmlFor="repeat-time">at</label>
                                                <select value={repeatTime} onChange={(e) => setRepeatTime(e.target.value)}>
                                                    {["08:00", "12:00", "15:00", "18:00"].map((time) => (
                                                        <option key={time} value={time}>
                                                            {time}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="button-row">
                            <button className="back-button2" onClick={handleBackClick}>Back</button>
                            <button className="next-button-scan" onClick={handleScanDetails} >Next</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateScan;

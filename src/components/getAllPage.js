import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/GetAllPage.css';
import { getPagesAPI } from '../api/getAllPageAPI.js';
import { faPlay, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { scanAPI } from "../api/saveScanAPI";
import { deleteAPI } from "../api/deleteService";


const ScanDetails = () => {
    const navigate = useNavigate();
    const [scanData, setScanData] = useState([]); // Store API data
    const [error, setError] = useState("");
    const isFetched = useRef(false); // Prevent multiple calls
    const [loadingScanId, setLoadingScanId] = useState(null);

    const fetchData = async () => {
        try {
            const response = await getPagesAPI();
            console.log("API Response:", response.data);

            if (response.status && response.data) {
                setScanData(response.data); // Set API response data
            } else {
                setError("Failed to load scan data.");
            }
        } catch (err) {
            setError(err.message || "Error fetching scan data.");
        }
    };
    useEffect(() => {
        if (isFetched.current) return;
        fetchData();
        isFetched.current = true;
    }, []);

    const handleCreateScanClick = () => {
        navigate('/create-scan');
    };

    const handleReScan = async (scanId) => {
        setLoadingScanId(scanId); // Start loading (disable button + show spinner)
        try {
            await scanAPI({ scanId });
            setTimeout(() => {
                setLoadingScanId(null); // Stop loading after 3 seconds
                fetchData(); // Refresh list
            }, 3000);
        } catch (err) {
            console.log("error", err);
            setError(err.message || "Scan failed.");
        }
    };



    const handleDeleteScan = async (id) => {
        // Delete scan logic goes here
        try {
            const deleteRes = await deleteAPI(id, "scanpage");
            console.log("deleteRes", deleteRes);
            if (deleteRes?.status) {
                fetchData();
            } else {
                fetchData();
            }
        } catch (err) {
            console.log("error", err);
            setError(err.message || "Scan failed.");
        }
        console.log("Delete scan with id:", id);
    }

    return (

        <div className="content-container">
            {/* Header Section */}
            <h1 className='title'>Accessibility Testing</h1>
            <div className="content-header">
                <p> <span className="content-title">Website Scanner</span></p>

                <button className="download-button" onClick={handleCreateScanClick}>
                    <i className="fa-solid fa-circle-plus"></i>
                    Create a new scan
                </button>
            </div>
            <div className="scan-table-container">
                <table className="scan-table">
                    <thead>
                        <tr>
                            <th>Scan Name</th>
                            <th>Level</th>
                            <th>Version</th>
                            <th>Status</th>
                            <th>Scan</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {scanData.map((scan, index) => (
                            <tr
                                key={index}
                                className="clickable-row"
                                onClick={() => navigate(`/pageDetails/${scan.id}`)} // Navigate to new page
                            >
                                <td>
                                    <div className="scan-name">
                                        <strong>{scan.name}</strong>
                                        <span>{scan.updatedAt} • {scan.allPageUrls.length} pages</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="scan-frequency">{scan.level}</span>
                                </td>
                                <td>
                                    <div className="latest-run">
                                        <span>{scan.version}</span>
                                    </div>
                                </td>

                                <td>
                                    <div className="run-stability1">
                                        <small className={scan.status === "active" ? "status-active" : "status-scanning"} >
                                            {scan.status}
                                        </small>
                                    </div>
                                </td>

                                <td>
                                    <div className="scan-actions">
                                        <button
                                            className="scan-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleReScan(scan.id);
                                            }}
                                            disabled={scan.status === "scanning" || loadingScanId === scan.id}
                                        >
                                            {loadingScanId === scan.id ? (
                                                <span className="spinner small-spinner"></span>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faPlay} /> Rescan
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div className="scan-actions">
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteScan(scan.id);
                                        }}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ScanDetails;
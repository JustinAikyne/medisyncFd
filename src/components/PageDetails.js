import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/PageDetails.css';
import { getScanDetailsAPI } from '../api/getScanDetailsAPI.js';
import webSocketService from "../api/websocketService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deleteAPI } from "../api/deleteService";
import no_data_img from "../img/no_data_found.png";
import moment from "moment-timezone";

const MyComponent = (utcTime) => {
    // const utcTime = "2025-03-21T09:43:27.711+00:00";
    const localTime = moment.utc(utcTime).local().format("YYYY-MM-DD HH:mm:ss");
    // return <div>Local Time: {localTime}</div>;
    return localTime;
};

const ScanDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scanDetail, setScanDetail] = useState([])
    // const [lodingStatus, setLodingStatus] = useState("loading");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const isFetched = useRef(false); // Prevent multiple calls

    const fetchDetails = async () => {
        try {
            const response = await getScanDetailsAPI(id);
            console.log("response", response.data);
            setIsLoading(false);
            if (response) {
                setScanDetail(response.data);
            } else {
                setScanDetail([]);
                setError("Failed to load scan details.");
            }
        } catch (err) {
            setIsLoading(false);
            setScanDetail([]);
            setError(err.message || "Error fetching details.");
        }
    };
    useEffect(() => {
        if (isFetched.current) return;
        fetchDetails();
    }, [id]);

    // useEffect(() => {
    //     if (isFetched.current) return;
    //     // Connect WebSocket on component mount
    //     console.log("connect web socket");
    //     let email = localStorage.getItem("email");
    //     if (!!email) {
    //         webSocketService.connect(email);
    //     }

    //     // return () => {
    //     //   // Disconnect WebSocket on unmount
    //     //   webSocketService.disconnect();
    //     // };
    // }, []);

    if (error) return <p className="error">{error}</p>;
    // if (!scanDetail) return <p>Loading...</p>;


    const handleRowClick = (run) => {
        navigate(`/guidelines`, { state: { scanData: run } });
        // navigate(`/guidelines`);
    };

    const handleCreateScanClick = () => {
        navigate('/create-scan');
    };

    const handleDeleteScan = async (id) => {
        // Delete scan logic goes here
        try {
            const deleteRes = await deleteAPI(id, "response");
            console.log("deleteRes", deleteRes);
            if (deleteRes?.status) {
                fetchDetails();
            } else {
                fetchDetails();
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
            {/* <div className="detail-header">
                <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
                <h1 className="title">Accessibility Testing</h1>
            </div> */}

            {/* Scan Overview */}
            {/* <div className="scan-overview">
                <div>
                    <h2 className="scan-title">{scanDetail.name}</h2>
                    <p className="scan-subtitle">View your scan run details</p>
                </div>
                <button className="scan-button">⟳ Run Latest Scan</button>
            </div> */}


            <h1 className='title'>Accessibility Testing</h1>
            <div className="content-header">
                <p><span className="content-title"> { } scan name Website Scanner</span><br />View your scan run details</p>

                <div className="button-group">

                    <button className="back-button1" onClick={() => navigate(-1)}>Back</button>

                    <button className="download-button" onClick={handleCreateScanClick}>
                        <i className="fa-solid fa-circle-plus"></i> Create a new scan
                    </button>
                </div>
            </div>

            {/* Scan Table */}



            {!scanDetail ? (
                // <p>Loading...</p>
                <div className="no-data-container">
                    <img src={no_data_img} alt="No data found" />
                </div>

            ) : scanDetail.length === 0 ? (
                <div className="no-data-container">
                    <img src={no_data_img} alt="No data found" />
                </div>
            ) : (
                <div className="scan-table-container">
                    {isLoading ? <p className="page-loading">Loading...</p> :
                    (
                        <table className="scan-table">

                            <thead>
                                <tr>
                                    <th>Scanned Time</th>
                                    <th>Page Url</th>
                                    <th>Total Issue Count</th>
                                    <th>Guideline Issue Count</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {scanDetail.map((run, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => handleRowClick(run)}
                                        className="clickable-row"
                                    >
                                        <td>
                                            <div className="scan-name">
                                                <strong>{scanDetail.name}</strong>
                                                {/* <span>{run.scanedTime}</span> */}
                                                <span>{MyComponent(run.scanedTime)}</span>
                                            </div>
                                        </td>
                                        <td>{run.pageUrl}</td>
                                        <td>
                                            <div className="scan-summary">
                                                {run.components > 0 ? (
                                                    <>
                                                        <strong>{run.components} components</strong>
                                                        <span>Scanned successfully</span>
                                                    </>
                                                ) : (
                                                    <span className="failed-text">
                                                        {run.totalIssueCount}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td>{run.guidelineIssueCount}</td>
                                        <td
                                            className={
                                                run.status === "COMPLETED"
                                                    ? "status-active"
                                                    : "status-scanning"
                                            }
                                        >
                                            {run.status === "COMPLETED"
                                                ? "Scan Completed"
                                                : "Scan in progress"}
                                        </td>
                                        <td>
                                            <div className="scan-actions">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteScan(run.id);
                                                    }}
                                                    disabled={run.status === "PROCESSING"}
                                                    className={run.status === "PROCESSING" ? "disabled-button" : ""}
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                    }
                </div>
            )}
        </div>
    );
};

export default ScanDetailPage;

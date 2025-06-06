import React from 'react';
import { useNavigate } from 'react-router-dom';
import index_banner from '../img/index_banner.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style/ScanDetails.css';


const ScanDetails = () => {
    const navigate = useNavigate();

    const handleCreateScanClick = () => {
        navigate('/create-scan');
    };

    var scanData = [
        {
            name: "Storefries",
            time: "Jan 8th, 12:10 PM",
            pages: "5 pages",
            frequency: "On-demand (2 runs)",
            issues: "176 accessibility issues",
            stability: "5/5 pages",
            status: "Scanned successfully",
        },
        {
            name: "Storefries",
            time: "Jan 8th, 08:14 AM",
            pages: "3 pages",
            frequency: "On-demand (2 runs)",
            issues: "76 accessibility issues",
            stability: "3/3 pages",
            status: "Scanned successfully",
        },
        {
            name: "Aikyne",
            time: "Jan 6th, 02:11 PM",
            pages: "1 page",
            frequency: "On-demand (2 runs)",
            issues: "23 accessibility issues",
            stability: "1/1 page",
            status: "Scanned successfully",
        },
        {
            name: "Adsparksocial",
            time: "Jan 2nd, 04:21 PM",
            pages: "5 pages",
            frequency: "On-demand (2 runs)",
            issues: "96 accessibility issues",
            stability: "5/5 pages",
            status: "Scanned successfully",
        },
        {
            name: "Brahos-vazoo",
            time: "Dec 25th, 07:15 AM",
            pages: "1 page",
            frequency: "On-demand (1 run)",
            issues: "12 accessibility issues",
            stability: "1/1 page",
            status: "Scanned successfully",
        },
    ];

    return (
        <div className="content-container">
            {/* Header Section */}
            <h1 className='title'>Accessibility Testing</h1>
            <div className="content-header">
                <p> <span className="content-title">Website Scanner</span> <br></br> Scan up to 10,000 pages in one go.</p>

                <button className="download-button" onClick={handleCreateScanClick}>
                    <i class="fa-solid fa-circle-plus"></i>
                    Create a new scan
                </button>
            </div>
            <div className="scan-table-container">
                <table className="scan-table">
                    <thead>
                        <tr>
                            <th>Scan Name</th>
                            <th>Scan Frequency</th>
                            <th>Latest Run</th>
                            <th>Run Stability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scanData.map((scan, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="scan-name">
                                        <strong>{scan.name}</strong>
                                        <span>{scan.time} • {scan.pages}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="scan-frequency">{scan.frequency}</span>
                                </td>
                                <td>
                                    <div className="latest-run">
                                        <span>{scan.issues}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="run-stability">
                                        <span>{scan.stability}</span>
                                        <small>{scan.status}</small>
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




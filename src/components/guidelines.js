import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/guidelines.css';
import { responseAPI } from "../api/scanResponseAPI";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Guidelines = ({ issues = [] }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("wcag"); // State for tab switching
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [ScanResponse, setScanResponse] = useState([]); // Store API data
    const [error, setError] = useState("");
    const [activeTab1, setActiveTab1] = useState("element-details");
    const location = useLocation();
    const scanData = location.state?.scanData;
    // const scanData ={data:[]};
    const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
    const [tooltipText, setTooltipText] = useState("Copy");
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showIssueDetails, setShowIssueDetails] = useState(false);

    // console.log("Received scanData:", scanData);

    const handleTabClick = (tab) => {
        setShowIssueDetails(false);
        setActiveTab(tab);
    };

    const handleIssueClick = async (guildelineId) => {
        setShowIssueDetails(true);
        setCurrentIssueIndex(0); // Reset index when a new issue is clicked
        if (!!scanData.scanId) {
            let reqObject = { scanId: scanData.scanId };
            if (guildelineId) {
                reqObject = { scanId: scanData.scanId, guildelineId: guildelineId };
            }
            reqObject = { scanId: scanData.scanId, guildelineId: guildelineId };
            const response = await responseAPI(reqObject); // Fetch data from API
            if (response.status && response?.data?.[0]) {
                setSelectedIssue(response.data[0]);
            } else {
                setError("Failed to load scan data.");
            }
        }
    };

    const handleCreateScanClick = () => {
        navigate('/create-scan');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // alert("Copied to clipboard!");
    };

    const isFetched = useRef(false); // Prevent multiple calls

    useEffect(() => {
        if (isFetched.current) return;
        const fetchData = async () => {
            try {
                if (!!scanData.scanId) {
                    const response = await responseAPI({ scanId: scanData.scanId }); // Fetch data from API
                    if (response.status && response.data) {
                        setScanResponse(response.data); // Set API response data
                    } else {
                        setError("Failed to load scan data.");
                    }
                }
            } catch (err) {
                setError(err.message || "Error fetching scan data.");
            }
        };

        fetchData();
        isFetched.current = true;
    }, []);

    const getSeverityColorClass = (severity) => {
        switch (severity) {
            case 'Critical':
                return 'critical';
            case 'Moderate':
                return 'moderate';
            case 'Serious':
                return 'serious';
            default:
                return 'moderate'; // fallback
        }
    };

    const guidelineCategory = [
        {
            "name": "Visual Accessibility",
            "description": `Enables users with visual impairments to access and understand content.
        Examples:
            Screen Readers: Software that reads aloud the text on a screen.
            Color Contrast Analyzers: Tools to ensure sufficient color contrast between text and background.
            Color Simulators: Software that simulates different color blindness types. `
        },
        {
            "name": "Auditory Accessibility",
            "description": `Makes audio content accessible to users with hearing impairments.
        Examples:
            Closed Captions: Text-based transcripts of audio content.
            Audio Descriptions: Narrated descriptions of visual elements for users who are blind or visually impaired.
            Assistive Listening Systems: Devices that amplify sound for users with hearing loss.`
        },
        {
            "name": "Physical Accessibility",
            "description": `Makes physical environments and technologies accessible to people with mobility impairments.
        Examples:
            Accessible Routes: Paths and ramps that are wheelchair-friendly.
            Accessible Parking: Designated parking spaces for people with disabilities.
            Accessible Restrooms: Restrooms equipped with features for users with mobility limitations.`
        },
        {
            "name": "Cognitive and Learning Disabilities",
            "description": `Supports users with cognitive and learning challenges.
            Examples:
                Text-to-Speech Software: Reads text aloud, aiding comprehension.
                Mind Mapping Software: Helps organize information visually.
                Study Skills Software: Provides tools for note-taking, organizing, and studying.`
        },
        {
            "name": "Accessibility API",
            "description": "A set of programming interfaces that allow developers to integrate accessibility features into their applications."
        },
        {
            "name": "Assistive Technology",
            "description": "A broad category of devices and software that help people with disabilities use technology more effectively."
        },
        {
            "name": "Multimedia Accessibility",
            "description": "Ensures that multimedia content, such as videos and presentations, is accessible to all users."
        },
        {
            "name": "Document and PDF Accessibility",
            "description": "Makes documents and PDFs accessible for screen readers and other assistive technologies."
        },
        {
            "name": "Website and Web Application Accessibility",
            "description": "Ensures that websites and web applications are designed and developed according to accessibility standards."
        },
        {
            "name": "Platform-Specific Accessibility Features",
            "description": "Accessibility features built into specific platforms, like operating systems or software."
        },
        {
            "name": "Compliance Tools",
            "description": "Tools that help organizations ensure they are meeting accessibility standards and regulations."
        },
        {
            "name": "Learning Management Systems (LMS) Accessibility",
            "description": " Ensures that LMS platforms are accessible to students with disabilities."
        },
        {
            "name": "Closed Functionality",
            "description": "Accessibility features that limit certain functionality for safety or other reasons, often used in conjunction with assistive technologies."
        }
    ];

    const categorizedData = guidelineCategory.map(category => {
        return {
            ...category,
            matchedItems: scanData.data.filter(item =>
                item?.guidelineCategory && item.guidelineCategory.toLowerCase().includes(category.name.toLowerCase())
            )
        };
    });
    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };



    // console.log("Categorized Data:", categorizedData);

    return (
        <div className="guidelines-container">
            <h1 className='title'>Accessibility Testing</h1>

            <div className="content-header">
                <p><span className="content-title">{ }Scan Name</span><br />View your scan run details</p>
                <div className="button-group">
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                    <button className="download-button" onClick={handleCreateScanClick}>
                        <i className="fa-solid fa-circle-plus"></i> Create a new scan
                    </button>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="tabs">
                <button className={activeTab === "wcag" ? "active1" : ""} onClick={() => handleTabClick("wcag")}>
                    WCAG guidelines
                </button>
                <button className={activeTab === "issue" ? "active2" : ""} onClick={() => handleTabClick("issue")}>
                Guideline categories
                </button>
            </div>

            <p className="description">
                Issues can be viewed by their type or by the accessibility guidelines (WCAG) they violate.
            </p>

            <div className="issues-wrapper">

                {/* Issues List */}

                {activeTab === "wcag" && (
                    <div className="issues-list">
                        {scanData.data.map((issue, index) => (
                            < div key={index} className="issue-item" onClick={() => handleIssueClick(issue.id)}>
                                <span className="issue-title">{issue.guideline} &gt;</span>
                                <span className="issue-count">{issue.issueCount}</span>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "issue" && (
                    <div className="issues-list">
                        {categorizedData.length > 0 && categorizedData.map((cat, index) => (
                            <div key={cat.name}>
                                {cat.matchedItems.length > 0 && (
                                    <div className="issue-item" onClick={() => toggleDropdown(index)}>
                                        <span className="issue-title">{cat.name} <i className="fa fa-caret-down"></i></span>
                                        <span className="issue-count">{cat.matchedItems.length}</span>
                                    </div>
                                )}
                                {activeDropdown === index && (
                                    <div className="dropdown-content">
                                        {cat.matchedItems.length > 0 && cat.matchedItems.map((issue, index) => (
                                            <div key={index} className="issue-item" onClick={() => handleIssueClick(issue.id)}>
                                                <span className="issue-guideline">{issue.guideline} &gt;</span>
                                                <span className="issue-guideline-count">{issue.issueCount}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Right Side: Issue Details Card (Visible When Selected) */}

                {selectedIssue && showIssueDetails && (
                    <div className="issue-details-card">
                        <h3>{selectedIssue.issueDetails[currentIssueIndex]?.tagName}
                            <span className='severity'>Severity: <span className={getSeverityColorClass(selectedIssue.issueDetails[currentIssueIndex]?.severity)}>
                                {selectedIssue.issueDetails[currentIssueIndex]?.severity}
                            </span></span>

                        </h3>
                        <p>Viewing issue: {currentIssueIndex + 1} of {selectedIssue.issueDetails.length}</p>
                        <p>
                            <strong>{selectedIssue.issueDetails[currentIssueIndex]?.title} </strong>
                            {selectedIssue.issueDetails[currentIssueIndex]?.guidelineLink && (
                                <a className='ref-link'
                                    href={selectedIssue.issueDetails[currentIssueIndex].guidelineLink}
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    Learn more <i className="fa-solid fa-up-right-from-square"></i>
                                </a>
                            )}
                        </p>
                        {selectedIssue.issueDetails[currentIssueIndex]?.refLink && (<p>
                            <a className='ref-link' href={selectedIssue.issueDetails[currentIssueIndex]?.refLink} target="_blank" rel="reference link">Reference</a>
                        </p>)}
                        <p><strong>Affected Page:</strong></p>
                        <div className="input-container">
                            <input type="text" value={scanData.pageUrl} readOnly />
                            {/* <button><i class="fa-regular fa-copy"></i></button> */}

                            <div className="copy-wrapper">
                                {/* <input type="text" value={scanData.pageUrl} readOnly /> */}

                                <button
                                    onMouseEnter={() => setTooltipText("Copy")}
                                    onClick={() => {
                                        copyToClipboard(scanData.pageUrl);
                                        setTooltipText("Copied!");
                                        setTimeout(() => setTooltipText("Copy"), 2000);
                                    }}
                                >
                                    <span className="tooltip">{tooltipText}</span>
                                    <i className="fa-regular fa-copy"></i>
                                </button>
                            </div>

                        </div>

                        <div className="issue-tabs">
                            <button
                                className={activeTab1 === "element-details" ? "active" : ""}
                                onClick={() => setActiveTab1("element-details")}
                            >
                                Element details
                            </button>
                            <button
                                className={activeTab1 === "how-to-fix" ? "active" : ""}
                                onClick={() => setActiveTab1("how-to-fix")}
                            >
                                How to fix
                            </button>
                        </div>

                        {activeTab1 === "element-details" && (
                            <div className="details-content">
                                <div className="content-box">
                                    <div className="content-header">
                                        <span>CSS selector</span>
                                        {/* <button onClick={() => copyToClipboard(selectedIssue.issueDetails[currentIssueIndex]?.selector)}><i class="fa-regular fa-copy"></i></button> */}


                                        <div className="copy-wrapper">
                                            <button
                                                onClick={() => copyToClipboard(selectedIssue.issueDetails[currentIssueIndex]?.selector)}
                                                onMouseEnter={() => setTooltipText("Copy")}
                                                onClickCapture={() => {
                                                    copyToClipboard(selectedIssue.issueDetails[currentIssueIndex]?.selector);
                                                    setTooltipText("Copied!");
                                                    setTimeout(() => setTooltipText("Copy"), 2000);
                                                }}
                                            >
                                                <span className="tooltip">{tooltipText}</span>
                                                <i className="fa-regular fa-copy"></i>
                                            </button>
                                        </div>



                                    </div>
                                    <code>{selectedIssue.issueDetails[currentIssueIndex]?.selector}</code>
                                </div>

                                <div className="content-box">
                                    <div className="content-header">
                                        <span>HTML snippet</span>
                                        {/* <button onClick={() => copyToClipboard(selectedIssue.issueDetails[currentIssueIndex]?.snippet)}><i class="fa-regular fa-copy"></i></button> */}
                                        <div className="copy-wrapper">
                                            <button
                                                onClick={() => copyToClipboard(selectedIssue.issueDetails[currentIssueIndex]?.snippet)}
                                                onMouseEnter={() => setTooltipText("Copy")}
                                                onClickCapture={() => {
                                                    copyToClipboard(selectedIssue.issueDetails[currentIssueIndex]?.snippet);
                                                    setTooltipText("Copied!");
                                                    setTimeout(() => setTooltipText("Copy"), 2000);
                                                }}
                                            >
                                                <span className="tooltip">{tooltipText}</span>
                                                <i className="fa-regular fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    {/* <SyntaxHighlighter language="html" wrapLines wrapLongLines>
                                        {selectedIssue.issueDetails[currentIssueIndex]?.snippet}
                                    </SyntaxHighlighter> */}

                                    <code> {selectedIssue.issueDetails[currentIssueIndex]?.snippet} </code>
                                </div>
                            </div>
                        )}

                        {activeTab1 === "how-to-fix" && (
                            <div className="details-content">
                                <h4>Fix all of the following {selectedIssue.issueDetails[currentIssueIndex].fixLink && ((<a className='ref-link'
                                    href={selectedIssue.issueDetails[currentIssueIndex].fixLink}
                                    target="_blank" rel="fix link"
                                >example...</a>))}
                                </h4>
                                <ul>
                                    <li>{selectedIssue.issueDetails[currentIssueIndex]?.fixes}</li>
                                </ul>
                            </div>
                        )}

                        <div className="issue-nav">
                            <button
                                disabled={currentIssueIndex === 0}
                                onClick={() => setCurrentIssueIndex(currentIssueIndex - 1)}
                            >
                                Previous
                            </button>
                            <button
                                disabled={currentIssueIndex === selectedIssue.issueDetails.length - 1}
                                onClick={() => setCurrentIssueIndex(currentIssueIndex + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Guidelines;

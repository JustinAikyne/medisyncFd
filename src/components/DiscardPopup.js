import React from "react";
import "../style/DiscardPopup.css"; // Add relevant CSS for your popup

const DiscardPopup = ({ show, onConfirm, onCancel }) => {
    if (!show) return null; // Render nothing if the popup is not visible

    return (
        <div className="popup-overlay">
            <div className="popup">

                <p className="popup-title"><i class="fa-solid fa-triangle-exclamation"></i> Your scan changes won't be saved</p>
                <p className="popup-description">If you proceed, you'll lose your progress and this scan will be discarded.</p>
                <div className="popup-buttons">
                    <button className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="discard-button" onClick={onConfirm}>
                        Discard scan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiscardPopup;

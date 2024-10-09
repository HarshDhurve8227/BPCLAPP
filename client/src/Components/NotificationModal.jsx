import React from "react";

export default function NotificationModal({ show, handleClose }) {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Notifications</h5>
                        <button type="button" className="close" onClick={handleClose}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body bg-info">
                        <p>Your notifications will appear here.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

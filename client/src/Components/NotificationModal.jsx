import React from "react";

export default function NotificationModal({ show, handleClose, notifications = [], sendWhatsAppMessage }) {
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
                        {notifications.length > 0 ? (
                            notifications.map((item, index) => (
                                <div key={index}>
                                    <p className="text-danger">
                                        AMC exceeds for the equipment with Next Due Date: {item.nextDueDate}
                                        <button
                                            className="btn btn-outline-info ms-3"
                                            onClick={() => sendWhatsAppMessage(item.mobileNumber)}
                                        >
                                            Send WhatsApp Message
                                        </button>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No AMC notifications available.</p>
                        )}
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

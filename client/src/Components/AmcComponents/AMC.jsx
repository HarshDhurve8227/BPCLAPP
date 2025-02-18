import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import NotificationModal from '../NotificationModal';
import './AMC.css';

export default function AMC({ setNotificationCount }) {

    const [equipments, setEquipments] = useState([]);
    const [error, setError] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Fetch the equipment data
    const fetchEquipments = async () => {
        try {
            const response = await axios.get('https://bpcl2024-a36b07a626d7.herokuapp.com/api/equipment/get');
            console.log('Fetched Equipments:', response.data);  // Debugging statement
            setEquipments(response.data);
            setError('');  // Clear any previous errors
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to fetch equipment: ' + error.message);
        }
    };

    // Log when the component is rendered
    useEffect(() => {
        console.log('AMC component is rendering...');
        fetchEquipments();
    }, []);

    // Format date function to display in 'MM/DD/YYYY'
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';  // If no date, return 'N/A'
        
        const date = new Date(dateString);
        console.log('Parsing Date:', dateString, 'Result:', date);  // Debugging statement

        // Check if date is valid
        if (isNaN(date.getTime())) {
            console.error('Invalid Date:', dateString);
            return 'Invalid Date';
        }

        // Format the date in MM/DD/YYYY
        const month = date.getMonth() + 1; // Months are 0-indexed
        const day = date.getDate();
        const year = date.getFullYear();
        
        // Return formatted date with leading zeroes where needed
        return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
    };

    // Function to check if the Next Due Date exceeds the threshold
    const checkAMCDate = (nextDueDate) => {
        const nextDue = new Date(nextDueDate); // Ensure this is a valid date object
        const today = new Date();

        // Check if the next due date is valid
        if (isNaN(nextDue.getTime())) {
            console.error('Invalid Date:', nextDueDate);
            return false; // Return false if invalid date
        }

        const differenceInTime = today.getTime() - nextDue.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert to days

        // Trigger notification if the next due date is in the past (difference > 0)
        return differenceInDays > 0;
    };

    // Function to send WhatsApp message with equipment name and Next Due Date
    const sendWhatsAppMessage = (mobileNumber, equipmentName, nextDueDate) => {
        // Log the received parameters for debugging
        console.log('Sending WhatsApp Message:', { mobileNumber, equipmentName, nextDueDate });

        if (!equipmentName || !nextDueDate) {
            console.error('Missing parameters for WhatsApp message:', { equipmentName, nextDueDate });
            return;
        }

        const formattedNextDueDate = formatDate(nextDueDate); // Correctly format the date
        const message = encodeURIComponent(`AMC has expired for the equipment: ${equipmentName} with Next Due Date: ${formattedNextDueDate}.`);
        // Ensure the message URL is correctly encoded and passed to WhatsApp
        const url = `https://wa.me/${mobileNumber}?text=${message}`;
        // Open WhatsApp in a new tab or window
        window.open(url, "_blank");
    };

    // Handle Notification Modal
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Calculate the number of notifications and store them
    useEffect(() => {
        const amcNotifications = equipments.filter(item => checkAMCDate(item.nextDueDate));
        setNotifications(amcNotifications);
        setNotificationCount(amcNotifications.length); // Pass the notification count to the parent component
    }, [equipments, setNotificationCount]);

    return (
        <div>
            <h2 className="text-primary">Annual Maintenance Contract</h2>
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={() => window.location.href = '/amcinsert'} className="custom-table-head btn btn-outline-success">Insert New Line</button>
            <br />
            
            {/* Notification Bell with Badge */}
            <ul className="navbar-nav ms-auto">
                <li className="notification-bell" onClick={handleShowModal}>
                    <div className="bell-icon">
                        <i className="fa fa-bell"></i>
                        <div className="badge">{notifications.length}</div> {/* Display notification count */}
                    </div>
                </li>
            </ul>

            <div className="table-wrapper">
                <table className="table table-striped table-hover mt-3 fs-5">
                    <thead>
                        <tr className="custom-table-head">
                            <th>Equipment</th>
                            <th>Company</th>
                            <th colSpan={2}>Validity</th>
                            <th>PMS</th>
                            <th>Vendor Code</th>
                            <th>Contract Number</th>
                            <th>Concerned Person</th>
                            <th>Mobile Number</th>
                            <th>Last Date of Checking</th>
                            <th>Next Due Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        <tr className="custom-table-head">
                            <th></th>
                            <th></th>
                            <th>From</th>
                            <th>To</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='custom-table-body'>
                        {equipments.length > 0 ? (
                            equipments.map((item, index) => {
                                const amcNotification = checkAMCDate(item.nextDueDate);
                                return (
                                    <tr key={index}>
                                        <td>{item.equipment || 'N/A'}</td>
                                        <td>{item.company || 'N/A'}</td>
                                        <td>{formatDate(item.validity?.from)}</td>
                                        <td>{formatDate(item.validity?.to)}</td>
                                        <td>{item.pms || 'N/A'}</td>
                                        <td>{item.vendorCode || 'N/A'}</td>
                                        <td>{item.contractNumber || 'N/A'}</td>
                                        <td>{item.concernedPerson || 'N/A'}</td>
                                        <td>{item.mobileNumber || 'N/A'}</td>
                                        <td>{formatDate(item.lastDateOfChecking)}</td>
                                        <td>{formatDate(item.nextDueDate)}</td>
                                        <td>
                                            <NavLink to={`/amcupdate/${item._id}`}>
                                                <button className="btn btn-primary">Update</button>
                                            </NavLink>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger">Delete</button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => sendWhatsAppMessage(item.mobileNumber, item.equipment, item.nextDueDate)}
                                            >
                                                Send WhatsApp
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="12">No equipment data available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Notification Modal */}
            <NotificationModal 
                show={showModal} 
                handleClose={handleCloseModal} 
                notifications={notifications}
                sendWhatsAppMessage={sendWhatsAppMessage}
            />
        </div>
    );
}

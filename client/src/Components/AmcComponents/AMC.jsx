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

  const managerNumbers = ['9955997938', '']; // Replace with actual manager numbers

  const fetchEquipments = async () => {
    try {
      const response = await axios.get('https://bpcl2024-a36b07a626d7.herokuapp.com/api/equipment/get');
      setEquipments(response.data);
      setError('');
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch equipment: ' + error.message);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-GB');
  };

  const checkAMCDate = (nextDueDate) => {
    const nextDue = new Date(nextDueDate);
    const today = new Date();
    return !isNaN(nextDue.getTime()) && today > nextDue;
  };

  const sendWhatsAppMessage = (mobileNumber, equipmentName, nextDueDate) => {
    if (!equipmentName || !nextDueDate) return;
    const formattedNextDueDate = formatDate(nextDueDate);
    const message = encodeURIComponent(`AMC has expired for the equipment: ${equipmentName} with Next Due Date: ${formattedNextDueDate}.`);
    const url = `https://wa.me/${mobileNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  const notifyManagers = (equipmentName, nextDueDate) => {
    managerNumbers.forEach(number => {
      sendWhatsAppMessage(number, equipmentName, nextDueDate);
    });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const amcNotifications = equipments.filter(item => checkAMCDate(item.nextDueDate));
    setNotifications(amcNotifications);
    setNotificationCount(amcNotifications.length);

    amcNotifications.forEach(item => {
      notifyManagers(item.equipment, item.nextDueDate);
    });
  }, [equipments, setNotificationCount]);

  return (
    <div>
      <h2 className="text-primary">Annual Maintenance Contract</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={() => window.location.href = '/amcinsert'} className="custom-table-head btn btn-outline-success">Insert New Line</button>

      <ul className="navbar-nav ms-auto notification-container">
        <li className="notification-bell" onClick={handleShowModal}>
          <div className="bell-icon">
            <i className="fa fa-bell"></i>
            <div className="badge">{notifications.length}</div>
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
              <th>WhatsApp</th>
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
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='custom-table-body'>
            {equipments.length > 0 ? (
              equipments.map((item, index) => (
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
                    <button className="btn btn-warning" onClick={() => sendWhatsAppMessage(item.mobileNumber, item.equipment, item.nextDueDate)}>Send</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14">No equipment data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <NotificationModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        notifications={notifications.map(n => ({ ...n, nextDueDate: formatDate(n.nextDueDate) }))} 
        sendWhatsAppMessage={sendWhatsAppMessage} 
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './AMC.css';

export default function AMC() {
    const [equipments, setEquipments] = useState([]);
    const [error, setError] = useState('');

    const fetchEquipments = async () => {
        try {
            const response = await axios.get('https://bpcl2024-a36b07a626d7.herokuapp.com/api/equipment/get');
            console.log('Fetched Equipments:', response.data);
            setEquipments(response.data);
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to fetch equipment: ' + error.message);
        }
    };

    useEffect(() => {
        fetchEquipments();
    }, []);

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US'); // Change 'en-US' to your desired locale
    };

    return (
        <div>
            <h2 className="text-primary">Annual Maintenance Contract</h2>
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={() => window.location.href = '/amcinsert'} className="custom-table-head btn btn-outline-success">Insert New Line</button>
            <br />
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
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12">No equipment data available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AMC.css';

export default function AMC() {
    const [equipments, setEquipments] = useState([]);
    const [error, setError] = useState('');

    const fetchEquipments = async () => {
        try {
            const response = await axios.get('https://bpcl2024-a36b07a626d7.herokuapp.com/api/equipment');
            setEquipments(response.data);
        } catch (error) {
            setError('Failed to fetch equipment: ' + error.message);
        }
    };

    useEffect(() => {
        fetchEquipments(); // Fetch equipment data on component mount
    }, []);

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
                            <th>Actions</th>
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
                    <tbody>
                        {equipments.map((item, index) => (
                            <tr key={index}>
                                <td>{item.equipment}</td>
                                <td>{item.company}</td>
                                <td>{item.validity.from}</td>
                                <td>{item.validity.to}</td>
                                <td>{item.pms}</td>
                                <td>{item.vendorCode}</td>
                                <td>{item.contractNumber}</td>
                                <td>{item.concernedPerson}</td>
                                <td>{item.mobileNumber}</td>
                                <td>{item.lastDateOfChecking}</td>
                                <td>{item.nextDueDate}</td>
                                <td>
                                    {/* Actions such as Edit/Delete can be added here */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

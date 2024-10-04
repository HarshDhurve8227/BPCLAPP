import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './AMC.css'

export default function AMC() {
    const [equipments, setEquipments] = useState([]);
    const [error, setError] = useState('');

    

   
    return (
        <div>
            <h2 className="text-primary">Annual Maintainance Contract</h2>
            <br></br>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <button onClick={() => window.location.href = '/amcinsert'} className="custom-table-head btn btn-outline-success">Insert New Line </button>
            <br></br>
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
                   
                </tbody>
            </table>
            </div>
        </div>
    );
}


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AMCInsert.css';

export default function AMCInsert() {
    const [equipment, setEquipment] = useState({
        equipment: '',
        company: '',
        validity: { from: '', to: '' },
        pms: '',
        vendorCode: '',
        contractNumber: '',
        concernedPerson: '',
        mobileNumber: '',
        lastDateOfChecking: '',
        nextDueDate: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('from') || name.includes('to')) {
            setEquipment({ ...equipment, validity: { ...equipment.validity, [name]: value } });
        } else {
            setEquipment({ ...equipment, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://bpcl2024-a36b07a626d7.herokuapp.com/api/equipment/add', equipment);
            navigate('/amc'); // Redirect to the AMC page after successful insert
        } catch (error) {
            setError('Failed to insert equipment: ' + error.response.data.message);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start', // Align to the top to allow margin
            height: '100vh',
            backgroundColor: '#f9f9f9',
            paddingTop: '50px' // Optional: add padding to the top if needed
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                width: '500px',
                marginTop: '50px' // Move the form down by 300px
            }}>
                <h3 className=" text-primary">Fill Information Below</h3>
                <br></br>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="custom-table-head">
                            Equipment:
                            <input type="text" name="equipment" placeholder="Equipment" onChange={handleChange} required />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Company:
                            <input type="text" name="company" placeholder="Company" onChange={handleChange} required />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Validity From:
                            <input type="date" name="from" onChange={handleChange} required />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Validity To:
                            <input type="date" name="to" onChange={handleChange} required />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            PMS:
                            <select name="pms" onChange={handleChange} required>
                                <option value="">Select PMS</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                            </select>
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Vendor Code:
                            <input type="text" name="vendorCode" placeholder="Vendor Code" onChange={handleChange} required />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Contract Number:
                            <input type="text" name="contractNumber" placeholder="Contract Number" onChange={handleChange} required />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Concerned Person:
                            <input type="text" name="concernedPerson" placeholder="Concerned Person" onChange={handleChange} required />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Mobile Number:
                            <input type="text" name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} required />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Last Date of Checking:
                            <input type="date" name="lastDateOfChecking" onChange={handleChange} required />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="custom-table-head">
                            Next Due Date:
                            <input type="date" name="nextDueDate" onChange={handleChange} required />
                        </label>
                    </div>
                    <br />
                    <button className="custom-table-head btn btn-outline-success" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
